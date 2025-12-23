import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import BookForm from '@/components/admin/forms/BookForm'
import Image from 'next/image';

const page = () => {
  return (
   <>
   <Button asChild className='bg-dark-500 back-btn'>
    <Link href="/admin/books">
        <Image src="/icons/admin/go-back.svg" alt="go-back-icon" width={18} height={18}/>
        Назад
    </Link>
   </Button>

   <section className='w-full mex-w-2xl'>
        <BookForm type="create" textOnButton='Добавить книгу в библиотеку'/>
   </section>
   </>
  )
}

export default page