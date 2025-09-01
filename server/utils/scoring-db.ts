// Turso (libSQL) client for scoring system
// Reads: runtimeConfig.tursoDatabaseUrl, runtimeConfig.tursoAuthToken
// Exposes a singleton client and ensures schema (platform_scores table)

import { useRuntimeConfig } from "#imports";
import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let schemaReady = false;

function getClient() {
  if (client) return client;
  const rc = useRuntimeConfig();
  const url = rc.tursoDatabaseUrl as string | undefined;
  const authToken = rc.tursoAuthToken as string | undefined;
  if (!url || !authToken) {
    throw new Error("Missing runtimeConfig.tursoDatabaseUrl or tursoAuthToken");
  }
  client = createClient({ url, authToken });
  return client;
}

export async function ensureScoringSchema() {
  if (schemaReady) return;
  const c = getClient();

  // Create platform_scores table with all columns (only if it doesn't exist)
  await c.execute(`CREATE TABLE IF NOT EXISTS platform_scores (
    slug TEXT PRIMARY KEY,
    total_score INTEGER NOT NULL,
    total_reviews INTEGER NOT NULL,
    playstore_rating REAL,
    playstore_reviews INTEGER,
    playstore_weight REAL,
    appstore_rating REAL,
    appstore_reviews INTEGER,
    appstore_weight REAL,
    trustpilot_rating REAL,
    trustpilot_reviews INTEGER,
    trustpilot_weight REAL,
    last_updated INTEGER NOT NULL DEFAULT (strftime('%s','now'))
  )`);

  // Create index for faster lookups (only if it doesn't exist)
  await c.execute(
    `CREATE INDEX IF NOT EXISTS idx_platform_scores_slug ON platform_scores (slug)`
  );

  schemaReady = true;
}

export function scoringDb() {
  return getClient();
}
