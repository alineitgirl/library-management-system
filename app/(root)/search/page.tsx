'use client';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import { useState } from 'react';

export default function SearchPage({}) {

    const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <div className='max-w-7xl mx-5 my-10 my-5 px-4 pt-10'>
        <div className='text-center my-5 '>
            <p className='text-light-100 uppercase text-sm tracking-widest text-sm my-2 font-semibold'>
                Выбери, какая книга будет следующей:
            </p>
            <h1 className='my-4 text-4xl md:text-6xl font-semibold text-white sm:text-4xl'>
                Найдёшь{" "} 
                    <span className='line-through text-white'>счастье{" "}</span>
                    <span className='text-light-200 uppercasefont-semibold mb-2 pt-2 '>{" "}любую книгу</span>
                    {" "}в нашей библиотеке
            </h1>
        </div>
    </div>

    <div className='flex items-center justify-center'>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>

    <div className='flex justify-between mx-2 my-10'>
        <p className='text-light-100 text-2xl font-semibold md:text-3xl sm:text-2xl'>
            Вот что удалось найти:
        </p>
        <Filter />
    </div>
    </>
  );
}
