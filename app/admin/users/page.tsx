import BooksTable from '@/components/admin/BooksTable';
import UsersTable from '@/components/admin/UsersTable';
import { Button } from '@/components/ui/button';
import { getAllUsers } from '@/database/queries/users';
import Link from 'next/link';
import React from 'react'

export default async function AdminBooksPage() {

  const users = await getAllUsers();

  return (
    <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-xl font-semibold'>Текущие пользователи</h2>
        </div>

        <UsersTable users={users} />
    </section>
  )
};
