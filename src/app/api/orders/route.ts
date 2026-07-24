import { NextRequest, NextResponse } from "next/server";

interface OrderItemPayload {
  partId: string;
  oemPartNumber: string;
  title: string;
  price: number;
  quantity: number;
  warehouseBin: string;
}

interface OrderRecord {
  orderId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItemPayload[];
  subtotal: number;
  vatAmount: number;
  shippingFee: number;
  totalAmount: number;
  status: "PENDING_PAYMENT" | "VERIFYING_SLIP" | "APPROVED" | "PREPARING_PARTS" | "READY_FOR_PICKUP" | "SHIPPED" | "REJECTED";
  fulfillmentType: "EXPRESS_SHIPPING" | "INSTORE_PICKUP";
  pickupBranch?: string;
  promptPayQrString: string;
  createdAt: string;
  slipVerified: boolean;
  ocrAuditDetails?: {
    extractedAmount?: number;
    bankReferenceNumber?: string;
    verifiedTimestamp?: string;
  };
}

const inMemoryOrders: OrderRecord[] = [
  {
    orderId: "ORD-992",
    customerName: "Somchai Kiatikun",
    customerPhone: "081-992-8812",
    items: [
      {
        partId: "part_fl5_hood",
        oemPartNumber: "15400-SPOON-FL5",
        title: "Spoon Sports Dry Carbon Vented Hood",
        price: 84500,
        quantity: 1,
        warehouseBin: "Bin C08-1",
      }
    ],
    subtotal: 84500,
    vatAmount: 5915,
    shippingFee: 0,
    totalAmount: 84500,
    status: "VERIFYING_SLIP",
    fulfillmentType: "INSTORE_PICKUP",
    pickupBranch: "Bangna Hub (Main)",
    promptPayQrString: "00020101021129370016A000000677010111011300668192833415802TH5303840540784500.006304ED2A",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    slipVerified: false,
  }
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    let results = [...inMemoryOrders];

    if (orderId) {
      const order = results.find((o) => o.orderId.toLowerCase() === orderId.toLowerCase());
      if (!order) {
        return NextResponse.json({ error: `Order not found: ${orderId}` }, { status: 404 });
      }
      return NextResponse.json({ success: true, order });
    }

    if (status && status !== "ALL") {
      results = results.filter((o) => o.status === status);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      orders: results,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to retrieve orders", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName = "Valued Customer",
      customerPhone = "081-000-0000",
      items = [],
      fulfillmentType = "INSTORE_PICKUP",
      pickupBranch = "Bangna Hub (Main)",
    } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
    const shippingFee = fulfillmentType === "EXPRESS_SHIPPING" ? 250 : 0;
    const totalAmount = subtotal + shippingFee;
    const vatAmount = Number((subtotal * 0.07).toFixed(2));

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    // Exact PromptPay EMVCo QR String simulation down to satang
    const formattedTotal = totalAmount.toFixed(2);
    const promptPayQrString = `00020101021129370016A000000677010111011300668192833415802TH53038405407${formattedTotal}6304ED2A`;

    const newOrder: OrderRecord = {
      orderId,
      customerName,
      customerPhone,
      items,
      subtotal,
      vatAmount,
      shippingFee,
      totalAmount,
      status: "PENDING_PAYMENT",
      fulfillmentType,
      pickupBranch: fulfillmentType === "INSTORE_PICKUP" ? pickupBranch : undefined,
      promptPayQrString,
      createdAt: new Date().toISOString(),
      slipVerified: false,
    };

    inMemoryOrders.unshift(newOrder);

    return NextResponse.json(
      {
        success: true,
        message: `Order ${orderId} initialized. Please complete PromptPay transfer of ฿${formattedTotal} within 15 minutes.`,
        order: newOrder,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(promptPayQrString)}`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Error creating order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status, ocrAuditDetails } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, status" },
        { status: 400 }
      );
    }

    const index = inMemoryOrders.findIndex((o) => o.orderId.toLowerCase() === orderId.toLowerCase());
    if (index === -1) {
      return NextResponse.json({ error: `Order ${orderId} not found` }, { status: 404 });
    }

    inMemoryOrders[index] = {
      ...inMemoryOrders[index],
      status,
      slipVerified: status === "APPROVED" || status === "PREPARING_PARTS" ? true : inMemoryOrders[index].slipVerified,
      ocrAuditDetails: ocrAuditDetails || inMemoryOrders[index].ocrAuditDetails,
    };

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} updated to status ${status}. Warehouse bin status synced.`,
      order: inMemoryOrders[index],
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to update order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
