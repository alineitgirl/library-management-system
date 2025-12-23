'use client'
import React from 'react'
import Image from 'next/image'

interface NotFoundProps {
    searchTerm: string;
    hasActiveFilters: boolean;
    onClear: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({
    searchTerm,
    hasActiveFilters,
    onClear
}) => {

    const trimmedSearchTerm = searchTerm.trim();

    return (
        <div className='flex flex-col items-center justify-center py-10 px-4 text-center'>
            {trimmedSearchTerm && (
                <h2 className='text-white text-xl mb-8'>
                    Результаты поиска для <span className='font-semibold'>{trimmedSearchTerm}</span>
                </h2>
            )}

            <div className='relative mb-8'>
                <Image src="/icons/not-found.svg" alt="not found" width={200} height={200}/>
            </div>

            <h3 className='text-2xl font-semibold text-white mb-4'>
                Результаты не найдены
            </h3>
            <p className='text-primary max-w-md mb-8 leading-relaxed'>
                Мы не нашли книги по Вашему запросу.
                <br/>
                Попробуйте использовать другие ключевые слова или проверьте наличие опечаток.
            </p>

            {hasActiveFilters && (
                <button
                    onClick={onClear}
                    className='px-8 py-3 bg-light-200 hover:bg-light-400 text-black font-semibold rounded-full transition-colors'
                >
                    ОЧИСТИТЬ ПОИСК
                </button>
            )}
        </div>
    )
}

export default NotFound;