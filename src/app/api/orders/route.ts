import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const orderNumber = searchParams.get("orderId"); // Note: searchParam is 'orderId', but we map it to 'orderNumber'
    const userId = searchParams.get("userId");

    const whereClause: Record<string, string> = {};
    if (orderNumber) {
      whereClause.orderNumber = orderNumber;
    } else {
      if (status && status !== "ALL") {
        whereClause.status = status;
      }
      if (userId) {
        whereClause.userId = userId;
      }
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            part: true
          }
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (orderNumber && orders.length > 0) {
      return NextResponse.json({ success: true, order: formatOrderRecord(orders[0]) });
    } else if (orderNumber && orders.length === 0) {
      return NextResponse.json({ error: `Order not found: ${orderNumber}` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders: orders.map(formatOrderRecord),
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
      userId,
      items = [],
      fulfillmentType = "INSTORE_PICKUP",
      pickupBranchId = "Bangna Hub (Main)",
    } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
    const shippingFee = fulfillmentType === "EXPRESS_SHIPPING" ? 250 : 0;
    const totalAmount = subtotal + shippingFee;
    const vatAmount = Number((subtotal * 0.07).toFixed(2));

    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const formattedTotal = totalAmount.toFixed(2);
    const promptPayQrString = `00020101021129370016A000000677010111011300668192833415802TH53038405407${formattedTotal}6304ED2A`;

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: "PENDING_PAYMENT",
        totalAmount,
        subtotal,
        shippingFee,
        vatAmount,
        fulfillmentType,
        pickupBranchId: fulfillmentType === "INSTORE_PICKUP" ? pickupBranchId : undefined,
        promptPayRef: promptPayQrString, // Using promptPayRef to store the QR string temporarily or we can just drop it
        items: {
          create: items.map((item: { partId: string; quantity: number; price: number }) => ({
            partId: item.partId,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          }))
        }
      },
      include: {
        items: {
          include: {
            part: true
          }
        },
        user: true
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: `Order ${orderNumber} initialized. Please complete PromptPay transfer of ฿${formattedTotal} within 15 minutes.`,
        order: formatOrderRecord(newOrder),
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
    const { orderId, status, ocrAuditDetails } = body; // Notice this is orderNumber from the frontend typically

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, status" },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { orderNumber: orderId },
      data: {
        status,
        ocrVerifiedAmount: ocrAuditDetails?.extractedAmount ? parseFloat(ocrAuditDetails.extractedAmount) : undefined,
        promptPayRef: ocrAuditDetails?.bankReferenceNumber ? ocrAuditDetails.bankReferenceNumber : undefined,
      },
      include: {
        items: {
          include: {
            part: true
          }
        },
        user: true
      }
    });

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} updated to status ${status}.`,
      order: formatOrderRecord(updatedOrder),
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to update order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Helper to format Prisma Order to the UI's expected OrderRecord format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatOrderRecord(prismaOrder: any) {
  return {
    orderId: prismaOrder.orderNumber,
    customerName: prismaOrder.user?.name || "Unknown",
    customerPhone: prismaOrder.user?.phone || "N/A",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: prismaOrder.items.map((item: any) => ({
      partId: item.partId,
      oemPartNumber: item.part?.oemPartNumber || "N/A",
      title: item.part?.title || "Unknown Part",
      price: Number(item.unitPrice),
      quantity: item.quantity,
      warehouseBin: item.part?.warehouseBin || "Pending",
    })),
    subtotal: Number(prismaOrder.subtotal),
    vatAmount: Number(prismaOrder.vatAmount),
    shippingFee: Number(prismaOrder.shippingFee),
    totalAmount: Number(prismaOrder.totalAmount),
    status: prismaOrder.status,
    fulfillmentType: prismaOrder.fulfillmentType,
    pickupBranch: prismaOrder.pickupBranchId,
    paymentSlipUrl: prismaOrder.paymentSlipUrl,
    promptPayQrString: prismaOrder.promptPayRef, // use promptPayRef for the QR string
    createdAt: prismaOrder.createdAt.toISOString(),
    slipVerified: ["APPROVED", "PREPARING_PARTS", "SHIPPED", "READY_FOR_PICKUP", "COMPLETED"].includes(prismaOrder.status),
    ocrAuditDetails: {
      extractedAmount: prismaOrder.ocrVerifiedAmount ? Number(prismaOrder.ocrVerifiedAmount) : undefined,
      bankReferenceNumber: prismaOrder.promptPayRef,
    }
  };
}
