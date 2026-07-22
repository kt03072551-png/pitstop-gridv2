import pg from "pg";
import "dotenv/config";

const url1 = process.env.DATABASE_URL || "";
const url2 = url1.replace("&channel_binding=require", "");
const url3 = url2.replace("-pooler", "");

async function testUrl(name: string, url: string) {
  if (!url) {
    console.log(`❌ ${name}: URL is empty`);
    return false;
  }
  console.log(`Testing ${name}: ${url.replace(/:[^:@]+@/, ":****@")}`);
  const client = new pg.Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query("SELECT 1 as val, current_database() as db");
    console.log(`✅ ${name} SUCCESS:`, res.rows[0]);
    await client.end();
    return true;
  } catch (err: any) {
    console.log(`❌ ${name} ERROR:`, err.message);
    try { await client.end(); } catch (e) {}
    return false;
  }
}

async function run() {
  await testUrl("Original URL (with channel_binding)", url1);
  await testUrl("Without channel_binding", url2);
  await testUrl("Direct URL (no -pooler, no channel_binding)", url3);
}

run();
