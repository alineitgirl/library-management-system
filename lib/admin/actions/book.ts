'use server';
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { success, z } from "zod";
import { bookSchema } from "@/lib/validations";
import { eq } from 'drizzle-orm';

type UpdateBookParams = z.infer<typeof bookSchema> & { id: string };

export const createBook = async (params: BookParams) => {
    try {

        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies
        }).returning();

        
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0]))
        }
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: 'An error occurred with creating the book'
        }
    }
}

export const updateBook = async (params: UpdateBookParams) => {
  const { id, ...values } = params;

  const validated = bookSchema.safeParse(values);
  if (!validated.success) {
    return {
      success: false,
      message: "Неверные данные формы",
    };
  }

  try {
    const [updatedBook] = await db
      .update(books)
      .set(validated.data)
      .where(eq(books.id, id))
      .returning();

    if (!updatedBook) {
      return {
        success: false,
        message: "Книга не найдена",
      };
    }

    return {
      success: true,
      data: updatedBook, // можно JSON.parse(JSON.stringify) если нужно сериализовать Date и т.д.
    };
  } catch (error: any) {
    console.error("Ошибка при обновлении книги:", error);
    return {
      success: false,
      message: error.message || "Произошла ошибка при обновлении книги",
    };
  }
};

export const deleteBook = async (id: string) => {
  try {
    await db.delete(books).where(eq(books.id, id));
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Ошибка при удалении книги:", error);
    return {
      success: false,
      message: error.message || "Произошла ошибка при удалении книги",
    };
  }
}
