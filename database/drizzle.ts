import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL! ?? 'postgresql://neondb_owner:npg_b3tJU7yOuGPx@ep-wild-star-agmm0d1l-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
console.log(databaseUrl);
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql});