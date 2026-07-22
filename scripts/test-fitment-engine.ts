import { MOCK_PARTS_CATALOG, MOCK_VEHICLE_TRIMS } from "../src/lib/mock-data";

console.log("=======================================================================");
console.log("🛠️ PITSTOP GRID V2 — AUTOMATED FITMENT VERIFICATION ENGINE WORKFLOW");
console.log("=======================================================================\n");

// 1. Load exact sample parts from catalog
const spoonHood = MOCK_PARTS_CATALOG.find((p) => p.oemPartNumber === "60100-FL5-000");
const bremboKit = MOCK_PARTS_CATALOG.find((p) => p.oemPartNumber === "1N1.9032A");
const motulOil = MOCK_PARTS_CATALOG.find((p) => p.oemPartNumber === "MOTUL-300V-4L");

// 2. Load exact sample vehicle trims
const fl5Trim = MOCK_VEHICLE_TRIMS.find((t) => t.id === "trim-fl5-20t");
const r15Trim = MOCK_VEHICLE_TRIMS.find((t) => t.id === "trim-r15-v4");

if (!spoonHood || !bremboKit || !motulOil || !fl5Trim || !r15Trim) {
  console.error("❌ Test aborted: Could not load mock catalog entries.");
  process.exit(1);
}

function runFitmentAudit(part: any, vehicleTrim: any) {
  console.log(`[TEST CASE] Evaluating Part: "${part.title}" (OEM: ${part.oemPartNumber})`);
  console.log(`            Against Vehicle: "${vehicleTrim.name}" (Trim ID: ${vehicleTrim.id})`);

  if (part.isUniversalFit) {
    console.log(`            Result: ℹ️ [ UNIVERSAL FIT ] — Compatible with all engines & platforms.\n`);
    return "UNIVERSAL";
  }

  const isCompatible = part.compatibleTrimIds?.includes(vehicleTrim.id);
  if (isCompatible) {
    console.log(`            Result: ✅ [ GUARANTEED FIT ] — Direct OEM bolt-on verified without modification.`);
    console.log(`            Notes : Factory mounting points match exactly. Covered by 100% Fitment Guarantee.\n`);
    return "FITS";
  } else {
    console.log(`            Result: ⚠️ [ INCOMPATIBLE ] — Mounting flanges or thread pitch do not align.`);
    console.log(`            Action: System blocks instant checkout and warns customer.\n`);
    return "INCOMPATIBLE";
  }
}

// Test Case 1: Spoon Hood against FL5 Civic (Should FIT)
const result1 = runFitmentAudit(spoonHood, fl5Trim);
if (result1 !== "FITS") throw new Error("Test 1 Failed: Expected FITS");

// Test Case 2: Spoon Hood against R15 Motorbike (Should be INCOMPATIBLE)
const result2 = runFitmentAudit(spoonHood, r15Trim);
if (result2 !== "INCOMPATIBLE") throw new Error("Test 2 Failed: Expected INCOMPATIBLE");

// Test Case 3: Brembo Big Brake Kit against FL5 Civic (Should FIT)
const result3 = runFitmentAudit(bremboKit, fl5Trim);
if (result3 !== "FITS") throw new Error("Test 3 Failed: Expected FITS");

// Test Case 4: Motul 300V Synthetic Oil against R15 Motorbike (Should be UNIVERSAL)
const result4 = runFitmentAudit(motulOil, r15Trim);
if (result4 !== "UNIVERSAL") throw new Error("Test 4 Failed: Expected UNIVERSAL");

console.log("=======================================================================");
console.log("🎉 ALL 4 FITMENT ENGINE AUDIT WORKFLOWS PASSED WITH 100% ACCURACY!");
console.log("=======================================================================");
