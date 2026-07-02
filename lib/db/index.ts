import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    const sql = neon(url);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

const handler: ProxyHandler<object> = {
  get(_, prop) {
    const target = getDb();
    const val = (target as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === "function") {
      return val.bind(target);
    }
    return val;
  },
};

export const db = new Proxy({}, handler) as ReturnType<typeof getDb>;
