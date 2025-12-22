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
import { ArrowUpDown, ChevronLeft, ChevronRight, ChevronDown, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { User } from '@/types';

interface UsersTableProps {
  users: User[];
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="font-semibold text-muted-foreground hover:text-foreground py-4"
      >
        Имя
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      return (
        <div className="flex items-center gap-3 py-2">
          {user.universityCard ? (
            <Image
              src={user.universityCard}
              alt={user.fullName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
              width={40}
              height={40}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              {initials}
            </div>
          )}
          <div>
            <div className="font-medium">{user.fullName}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата регистрации',
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
    accessorKey: 'role',
    header: 'Роль в системе',
    cell: ({ row }) => {
      const user = row.original;
      const isAdmin = user.role === 'ADMIN';

      return (
        <div className="flex items-center gap-2 justife-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 px-3 flex items-center gap-2 border-none rounded-full">
                <Badge
                  variant="secondary"
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                    isAdmin
                      ? 'bg-green-200 text-green-800 border-green-350'
                      : 'bg-pink-200 text-pink-700 border-pink-350'
                  }`}
                >
                  {user.role === 'ADMIN' ? 'Админ' : 'Пользователь'}
                </Badge>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-32 p-1 shadow-lg rounded-lg">
              <DropdownMenuItem
                className="px-3 py-2 text-0.5rem rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  console.log('Set role User for ID:', user.id);
                }}
              >
                Пользователь
              </DropdownMenuItem>
              <DropdownMenuItem
                className="px-3 py-2 text-sm rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  console.log('Set role Admin for ID:', user.id);
                }}
              >
                Админ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: 'booksBorrowed',
    header: 'Забронировано книг',
    cell: ({ row }) => <div className="text-muted-foreground text-center">{row.getValue('booksBorrowed')}</div>,
  },
  {
    accessorKey: 'universityId',
    header: 'Номер студенческого билета',
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('universityId')}</div>,
  },
  {
    id: 'universityIdCard',
    header: 'Билет студента',
    cell: ({ row }) => {
      const url = row.getValue('universityCard');
      return url ? (
        <Button
          variant="link"
          className="text-blue-600 p-0 h-auto font-normal flex items-center gap-1 hover:underline"
          onClick={() => setCurrentCard({ url, name: row.getValue('fullName') })}
        >
          Посмотреть карту
          <Eye className="h-4 w-4" />
        </Button>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Действия',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            if (confirm('Are you sure you want to delete this user?')) {
              console.log('Delete user ID:', user.id);
            }
          }}
          className="hover:bg-red-50 rounded-full"
        >
          <Image src="/icons/admin/trash.svg" alt="Delete" width={20} height={20} />
        </Button>
      );
    },
  },
];

export default function UsersTable({ users }: UsersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'name', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pageSize, setPageSize] = React.useState(20);
  const [currentCard, setCurrentCard] = React.useState<{ url: string; name: string } | null>(null);

  const table = useReactTable({
    data: users,
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
  const filteredTotal = table.getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(pageIndex * pageSize + pageSize, filteredTotal);

  return (
    <div className="w-full space-y-8">

      <div className="max-w-md">
        <Input
          placeholder="Поиск по имени..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
          className="w-full my-5 bg-light-300"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 p-4">
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
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground italic">
                  По вашему запросу пользователей не найдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!currentCard} onOpenChange={() => setCurrentCard(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Открыть карту студента — {currentCard?.name}</DialogTitle>
          </DialogHeader>
          {currentCard && (
            <Image src={currentCard.url} alt="ID Card" className="w-full rounded-lg shadow-md" width={40} height={40}/>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Показано: {endRow} из {filteredTotal} записей
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Количество записей на странице:</span>
            <Select value={`${pageSize}`} onValueChange={(value) => setPageSize(Number(value))}>
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
            >
              <ChevronLeft className="h-4 w-4" />
              Назад
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='bg-primary-admin text-white hover:text-light-200'
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