import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import BookForm from '@/components/admin/forms/BookForm'
import { db } from '@/database/drizzle';
import { auth } from '@/auth';
import { books } from '@/database/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';

const page = async ({ params } : { params: Promise<{id : string}>}) => {

    const id = ( await params).id;
    
    const session = await auth();
    
    const [bookDetails] = await db
        .select()
        .from(books)
        .where(eq(books.id, id))
        .limit(1);

  return (
   <>
   <Button asChild className='bg-dark-500 back-btn'>
    <Link href="/admin/books">
        <Image src="/icons/admin/go-back.svg" alt="go-back-icon" width={18} height={18}/>
        Назад
    </Link>
   </Button>

   <section className='w-full mex-w-2xl'>
        <BookForm type="update" textOnButton='Обновить данные о книге' {...bookDetails}/>
   </section>
   </>
  )
}

export default page