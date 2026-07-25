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

    if (orderNumber) {
      if (orders.length > 0) {
        return NextResponse.json({ success: true, order: formatOrderRecord(orders[0]) });
      } else {
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
      }
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
      paymentSlipUrl,
      ocrVerifiedAmount,
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

    // Verify user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Invalid userId or user no longer exists. Please re-login." },
        { status: 400 }
      );
    }

    // Resolve partIds — the cart may hold mock IDs (e.g. "part-1") or
    // oemPartNumbers instead of actual database UUIDs. Look up the real
    // Part record for each item so Prisma's FK constraint is satisfied.
    const resolvedItems: { partId: string; quantity: number; price: number }[] = [];
    for (const item of items as { partId: string; oemPartNumber?: string; quantity: number; price: number }[]) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.partId);

      // Try resolving by partId (if it's a UUID), oemPartNumber, or SKU
      const orConditions: Record<string, string>[] = [
        { oemPartNumber: item.oemPartNumber || "" },
        { sku: item.partId },
        { oemPartNumber: item.partId },
      ];
      
      if (isUuid) {
        orConditions.push({ id: item.partId });
      }

      const dbPart = await prisma.part.findFirst({
        where: { OR: orConditions },
        select: { id: true, price: true },
      });

      if (!dbPart) {
        return NextResponse.json(
          { error: `Part not found or no longer exists: ${item.partId}` },
          { status: 400 }
        );
      }

      resolvedItems.push({
        partId: dbPart.id,
        quantity: item.quantity,
        price: item.price || Number(dbPart.price),
      });
    }

    const subtotal = resolvedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
        totalAmount,
        subtotal,
        shippingFee,
        vatAmount,
        fulfillmentType,
        pickupBranchId: fulfillmentType === "INSTORE_PICKUP" ? pickupBranchId : undefined,
        promptPayRef: promptPayQrString,
        paymentSlipUrl,
        ocrVerifiedAmount,
        status: paymentSlipUrl ? "VERIFYING_SLIP" : "PENDING_PAYMENT",
        items: {
          create: resolvedItems.map((item) => ({
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
        qrCodeUrl: `/Fvck-this-project.png`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Order creation error:", error);
    let errorMessage = "Error creating order";
    let errorDetails = error instanceof Error ? error.message : "Unknown error";
    
    // Check for Prisma connection pooling / timeout errors
    if (errorDetails.includes("08P01") || errorDetails.includes("Authentication timed out") || errorDetails.includes("Connection pool") || errorDetails.includes("timeout")) {
      errorMessage = "Database connection timeout. The server is currently experiencing high load.";
      errorDetails = "Please try placing your order again in a few moments.";
    }

    return NextResponse.json(
      { 
        error: errorMessage, 
        details: errorDetails,
        stack: error instanceof Error ? error.stack : undefined
      },
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
