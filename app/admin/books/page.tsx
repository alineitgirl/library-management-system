import BooksTable from '@/components/admin/BooksTable';
import { Button } from '@/components/ui/button';
import { getAllBooks } from '@/database/queries/books';
import Link from 'next/link';
import React from 'react'


export default async function AdminBooksPage() {

  const books = await getAllBooks();

  return (
    <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-xl font-semibold'>Все книги</h2>
             <Button className='bg-primary-admin' asChild>
                <Link href="/admin/books/new" className='text-white'>
                + Добавить новую книгу</Link>
             </Button>
        </div>

        <BooksTable books={books} />
    </section>
  )
};
