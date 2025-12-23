import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import BookForm from '@/components/admin/forms/BookForm'

const page = () => {
  return (
   <>
   <Button asChild className='back-btn'>
    <Link href="/admin/books">
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