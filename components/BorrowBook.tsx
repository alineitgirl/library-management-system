'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string
    }
}

const BorrowBook = ({userId, bookId, borrowingEligibility: { isEligible, message} } : Props) => {

    const router = useRouter();
    const [ borrowing, setBorrowing] = useState(false);

    const handleBorrow = async () => {
        if (!isEligible) {
            toast(
                {
                    title: 'Ошибка',
                    description: message,
                    variant: 'destructive'
                }
            )
        }

        setBorrowing(true);

        try {

            const result = await borrowBook({userId, bookId});

            if (result.success) {
                toast({
                    title: 'Успешно',
                    description: 'Книга успешно забронирована'
                });
                
                router.push('/my-profile')
            }
            else {
                toast(
                    {
                        title: 'Ошибка',
                        description: result.error,
                        variant: 'destructive'
                    }
                )
            }
            
        } catch (error) {
            toast(
                {
                    title: 'Ошибка',
                    description: 'Произошла ошибка при бронировании книги',
                    variant: 'destructive'
                }
            )
        }
        finally {
            setBorrowing(false);
        }
    }

  return (
    <Button className="book-overview_btn" onClick={handleBorrow} disabled={borrowing}>
        <Image src="/icons/book.svg" alt="book" width={20} height={20}/>
        <p className='font-bebas-neue text-xl text-dark-100 uppercase text-narrow'>{borrowing ?
        'Бронируем...' : 'Забронировать'}</p>
    </Button>
  )
}

export default BorrowBook;