'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBook } from "@/lib/admin/actions/book";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import FileUpload from "@/components/ImageUpload";
import ColorPicker from "../ColorPicker";



interface Props extends Partial<Book> {
  type?: "create" | "update"
} 

const BookForm = ({ type, ...book } : Props) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
        },
});

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values);

        if (result.success) {
            toast({
                title: "Успешно",
                description: "Книга успешно добавлена",
            });

            router.push(`/books/${result.data.id}`);
        } else {
            toast({
                title: "Ошибка",
                description: result.message,
                variant: "destructive",
            });
        }

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">Название книги</FormLabel>
                            <FormControl>
                                <Input 
                                required
                                placeholder="Название книги"
                                {...field} 
                                className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                control={form.control}
                name={"author"}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Автор</FormLabel>
                        <FormControl>
                            <Input 
                            required
                            placeholder="Автор"
                            {...field} 
                            className="book-form_input"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                >
                </FormField>

                <FormField
                control={form.control}
                name={"genre"}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">Жанр</FormLabel>
                        <FormControl>
                            <Input 
                            required
                            placeholder="Жанр"
                            {...field} 
                            className="book-form_input"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                >
                </FormField>

                <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Рейтинг
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book rating"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Количество экземпляров
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  placeholder="Total copies"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Обложка книги
              </FormLabel>
              <FormControl>
                <FileUpload  type="image" accept="image/*" onFileChange={field.onChange} value={field.value} folder="books/covers"
                variant="light" placeholder="Загрузить обложку книги"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Цвет книги
              </FormLabel>
              <FormControl>
                <ColorPicker onPickerChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Описание
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание"
                  {...field}
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Трейлер
              </FormLabel>
              <FormControl>
                 <FileUpload  type="video" accept="video/*" onFileChange={field.onChange} value={field.value} folder="books/videos"
                variant="light" placeholder="Загрузить трейлер"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Сводка
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Краткое содержание"
                  {...field}
                  rows={5}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

          <Button type="submit" className="book-form_btn text-white">
                Добавить книгу в библиотеку
          </Button>
        </form>
        </Form>
    )

}

export default BookForm;