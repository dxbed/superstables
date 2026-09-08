import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/** Neon over HTTP: no connection pool to manage, works in Node and Edge runtimes. */
function connectionString() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return url;
}

export const db = drizzle(neon(connectionString()), { schema });
export { schema };
