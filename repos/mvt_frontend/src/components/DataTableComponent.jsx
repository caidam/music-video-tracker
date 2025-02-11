import * as React from "react"
import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    "id": "m5gr84i9",
    "amount": 316,
    "status": "success",
    "email": "ken99@yahoo.com"
  },
  {
    "id": "3u1reuv4",
    "amount": 242,
    "status": "success",
    "email": "Abe45@gmail.com"
  },
  {
    "id": "derv1ws0",
    "amount": 837,
    "status": "processing",
    "email": "Monserrat44@gmail.com"
  },
  {
    "id": "5kma53ae",
    "amount": 874,
    "status": "success",
    "email": "Silas22@gmail.com"
  },
  {
    "id": "bhqecj4p",
    "amount": 721,
    "status": "failed",
    "email": "carmella@hotmail.com"
  },
  {
    "id": "12lkjpq9",
    "amount": 456,
    "status": "success",
    "email": "john.doe@gmail.com"
  },
  {
    "id": "24mkopl0",
    "amount": 130,
    "status": "failed",
    "email": "jane.doe@yahoo.com"
  },
  {
    "id": "35nmpqr8",
    "amount": 675,
    "status": "success",
    "email": "alice@example.com"
  },
  {
    "id": "47opqrs7",
    "amount": 892,
    "status": "processing",
    "email": "bob@example.com"
  },
  {
    "id": "59pqrst6",
    "amount": 234,
    "status": "success",
    "email": "charlie@example.com"
  },
  {
    "id": "61qrsuv5",
    "amount": 789,
    "status": "failed",
    "email": "dave@example.com"
  },
  {
    "id": "73rstvw4",
    "amount": 312,
    "status": "processing",
    "email": "eve@example.com"
  },
  {
    "id": "85stuvwx3",
    "amount": 154,
    "status": "success",
    "email": "frank@example.com"
  },
  {
    "id": "97tuvwxy2",
    "amount": 967,
    "status": "failed",
    "email": "grace@example.com"
  },
  {
    "id": "109uvwxy1",
    "amount": 401,
    "status": "success",
    "email": "hank@example.com"
  },
  {
    "id": "21vwxyz0",
    "amount": 675,
    "status": "processing",
    "email": "iris@example.com"
  },
  {
    "id": "32wxyzab9",
    "amount": 543,
    "status": "failed",
    "email": "jack@example.com"
  },
  {
    "id": "43xyzabc8",
    "amount": 219,
    "status": "success",
    "email": "kate@example.com"
  },
  {
    "id": "54yzabcd7",
    "amount": 342,
    "status": "processing",
    "email": "leo@example.com"
  },
  {
    "id": "65zabcde6",
    "amount": 798,
    "status": "success",
    "email": "maya@example.com"
  },
  {
    "id": "76abcdef5",
    "amount": 431,
    "status": "failed",
    "email": "nick@example.com"
  },
  {
    "id": "87bcdefg4",
    "amount": 123,
    "status": "success",
    "email": "olivia@example.com"
  },
  {
    "id": "98cdefgh3",
    "amount": 654,
    "status": "processing",
    "email": "peter@example.com"
  },
  {
    "id": "109defghi2",
    "amount": 890,
    "status": "success",
    "email": "queen@example.com"
  },
  {
    "id": "210efghij1",
    "amount": 321,
    "status": "failed",
    "email": "rose@example.com"
  }
]


export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
    //   sorting,
    //   columnFilters,
    //   columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          type='search'
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <div className="rounded-md border">

        <Table>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Showing {table.getPaginationRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s).
        </div>

        <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
