'use server';

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {

      const [book] = await db
      .select({ availableCopies: books.availableCopies})
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

      if (!book || book.availableCopies <= 0) {
        return {
            success: false,
            error: 'Нет доступных экземпляров книги',
        }
      }

      const dueDate = dayjs().add(7, 'day').toDate();

     await db
     .update(books)
     .set({availableCopies: book.availableCopies - 1})
     .where(eq(books.id, bookId));

     let insertedRecord : any = null!

     try {
        const result = await db
        .insert(borrowRecords)
        .values({
            userId,
            bookId,
            dueDate,
            status: 'Забронировано',
        }).returning();

        insertedRecord = result[0] || null;

        return {
            success: true,
            data: insertedRecord,
        };

     } catch (error) {
        console.error('Ошибка при создании записи:', error);
        return {
            success: false,
            error: 'Произошла ошибка при создании записи о бронировании книги',
        };
     }

  } catch (error: any) {
    console.error('Ошибка при бронировании:', error);
    return {
      success: false,
      error: error.message || 'Произошла ошибка при бронировании книги',
    };
  }
};