import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { Book } from "@/types"
import { eq } from "drizzle-orm";

export async function getAllGenres(): Promise<string[]> {
  const result = await db
    .selectDistinct({ genre: books.genre })
    .from(books)
    .orderBy(books.genre);

  return result.map(row => row.genre);
}

export async function getBooksByGenre(genre?: string) : Promise<Book[]> {
    let query = db.select().from(books);

    if (genre) {
        query = query.where(eq(books.genre, genre));
    }

    return await query.orderBy(books.title);
}

export async function getAllBooks() : Promise<Book[]> {
  return await db.select().from(books);
}

