'use client';

import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { deleteBook } from '@/lib/admin/actions/book';
import { toast } from '@/hooks/use-toast';

const placeholderCover = '/placeholder-book.jpg';

interface BooksTableProps {
  books: Book[];
}

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="font-semibold text-muted-foreground hover:text-foreground"
      >
        Название книги
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const coverUrl = row.original.coverUrl || placeholderCover;
      return (
        <div className="flex items-center gap-4 py-2">
          <img
            src={coverUrl}
            alt={row.getValue('title')}
            className="w-12 h-16 object-cover rounded-md shadow-lg border border-gray-200"
          />
          <div className="font-medium text-foreground">{row.getValue('title')}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'author',
    header: 'Автор',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('author') || 'Unknown'}</div>
    ),
  },
  {
    accessorKey: 'genre',
    header: 'Жанр',
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">{row.getValue('genre')}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className="text-muted-foreground">
          {date.toLocaleDateString('ru-RU', {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Действия',
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-blue-50 rounded-full"
          >
            <Link href={`/admin/books/edit/${book.id}`}>
              <Image src="/icons/admin/edit.svg" alt="edit-icon" width={20} height={20} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
                await deleteBook(book.id);
                console.log('Delete book ID:', book.id);
                toast({
                  title: "Успешно",
                  description: "Книга успешно удалена",
                })
              }
            }}
            className="hover:bg-red-50 rounded-full"
          >
           <Link href={`/admin/books/`}>
              <Image src="/icons/admin/trash.svg" alt="delete-icon" width={20} height={20} />
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export default function BooksTable({ books }: BooksTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'title', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pageSize, setPageSize] = React.useState(20);

  const table = useReactTable({
    data: books,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  React.useEffect(() => {
    table.setPageSize(pageSize);
    table.setPageIndex(0);
  }, [pageSize, table]);

  const pageIndex = table.getState().pagination.pageIndex;
  const currentPageSize = table.getState().pagination.pageSize;
  const filteredTotal = table.getFilteredRowModel().rows.length;
  const startRow = pageIndex * currentPageSize + 1;
  const endRow = Math.min(pageIndex * currentPageSize + currentPageSize, filteredTotal);

  return (
    <div className="w-full space-y-8">

      <div className="max-w-md">
        <Input
          placeholder="Поиск по названию..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value)}
          className="w-full mt-5 bg-light-300 shadow-sm"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-muted-foreground font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  По вашему запросу ничего не найдено...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Показано: {endRow} из {filteredTotal} книг
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Количество на странице</span>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='text-white bg-primary-admin hover:bg-light-200 hover:text-white'
            >
              <ChevronLeft className="h-4 w-4" />
              Назад
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='text-white bg-primary-admin hover:bg-light-200 hover:text-white'
            >
              Вперед
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}