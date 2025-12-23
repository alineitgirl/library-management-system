'use client';

import Filter from '@/components/Filter';
import Search from '@/components/Search';
import { getAllGenres } from '@/database/queries/books';
import { getBooksByGenre } from '@/database/queries/books'; 
import { useState, useEffect, useMemo } from 'react';
import { Book } from '@/types';
import BookCard from '@/components/BookCard';
import NotFound from '@/components/NotFound';

const BOOKS_PER_PAGE = 12;

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [allGenres, allBooks] = await Promise.all([
          getAllGenres(),
          getBooksByGenre(), 
        ]);
        setGenres(allGenres);
        setBooks(allBooks);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenre]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
      const matchesSearch =
        searchTerm === '' ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [books, selectedGenre, searchTerm]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    pages.push(1);

    if (currentPage > 4) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return Array.from(new Set(pages));
  };

  const pageNumbers = generatePageNumbers();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-5 my-10 px-4 pt-10">
        <div className="text-center my-5">
          <p className="text-light-100 uppercase text-sm tracking-widest my-2 font-semibold">
            Выбери, какая книга будет следующей:
          </p>
          <h1 className="my-4 text-4xl md:text-6xl font-semibold text-white sm:text-4xl">
            Найдёшь{" "}
            <span className="line-through text-white">счастье</span>
            <span className="text-light-200 md:text-6xl sm:text-4xl font-semibold mb-2 pt-2">
              {" "}любую книгу
            </span>
            {" "}в нашей библиотеке
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center mb-10">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mx-2 my-10 gap-4">
        <p className="text-light-100 text-2xl font-semibold md:text-3xl sm:text-2xl">
          Вот что удалось найти ({filteredBooks.length}):
        </p>
        <Filter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>

      {loading && (
        <p className="text-center text-gray-400">Загрузка книг...</p>
      )}

      {!loading && filteredBooks.length === 0 && (
        <NotFound searchTerm={searchTerm} hasActiveFilters={selectedGenre !== ''} onClear={() => {
            setSelectedGenre('')
            setSearchTerm('')
        }
        } />
      )}

      {!loading && filteredBooks.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
            {currentBooks.map((book) => (
              <BookCard 
                key={book.id} 
                {...book}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-end items-center mt-12 gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
              >
                {'<'}
              </button>

              {pageNumbers.map((page, index) =>
                page === '...' ? (
                  <span key={index} className="px-3 text-white">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => goToPage(page as number)}
                    className={`w-10 h-10 flex items-center justify-center rounded transition ${
                      page === currentPage
                        ? 'bg-light-200 text-black font-semibold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
              >
                {'>'}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}