import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm";
import { User } from "@/types";

export async function getAllUsers() : Promise<User[]> {
    return await db.select().from(users) as User[];
}