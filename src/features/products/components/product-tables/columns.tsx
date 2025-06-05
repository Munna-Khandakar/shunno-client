'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Transection } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<Transection>[] = [
  {
    id: 'transection_type',
    accessorKey: 'transection_type',
    header: ({ column }: { column: Column<Transection, unknown> }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Transection['transection_type']>();
      const Icon = status === 'deposit' ? ArrowDown : ArrowUp;

      return (
        <Badge
          variant='outline'
          className={`capitalize ${status === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }: { column: Column<Transection, unknown> }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Transection['category']>();
      const Icon = status === 'active' ? CheckCircle2 : XCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'categories',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT'
  },
  {
    accessorKey: 'account',
    header: 'ACCOUNT'
  },
  {
    accessorKey: 'note',
    header: 'NOTE',
    cell: ({ cell }) => {
      const status = cell.getValue<Transection['note']>();

      return (
        <span>
          {status.slice(0, 30)}
          {status.length > 30 && '...'}
        </span>
      );
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
