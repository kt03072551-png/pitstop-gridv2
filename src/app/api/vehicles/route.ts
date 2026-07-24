import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const makes = await prisma.vehicleMake.findMany({
      include: {
        models: {
          include: {
            trims: true
          }
        }
      }
    });

    // We can format it to match the expected structure if needed,
    // or just return the nested structure and let the frontend flatten it.
    // Let's format it to closely match MOCK_VEHICLE_MAKES, MOCK_VEHICLE_MODELS, and MOCK_VEHICLE_TRIMS
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedMakes: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedModels: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedTrims: any[] = [];

    makes.forEach(make => {
      formattedMakes.push({
        id: make.id,
        name: make.name,
        type: make.type
      });

      make.models.forEach(model => {
        formattedModels.push({
          id: model.id,
          makeId: make.id,
          name: model.name,
          generation: model.generation,
          startYear: model.startYear,
          endYear: model.endYear
        });

        model.trims.forEach(trim => {
          formattedTrims.push({
            id: trim.id,
            modelId: model.id,
            name: trim.name,
            engineCode: trim.engineCode,
            horsepower: trim.horsepower,
            fuelType: trim.fuelType
          });
        });
      });
    });

    return NextResponse.json({
      success: true,
      makes: formattedMakes,
      models: formattedModels,
      trims: formattedTrims,
    });
  } catch (error: unknown) {
    console.error("GET Vehicles Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve vehicle matrix", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
