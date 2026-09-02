import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Spinner } from "../ui/spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface DataTableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  error?: string;
  pageSize?: number;
}

export function DataTable<TData extends object>({
  data,
  columns,
  isLoading = false,
  error,
  pageSize = 10,
}: Readonly<DataTableProps<TData>>) {
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  });

  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination;
  const totalRows = data.length;
  const rowPerPage = Math.min((pageIndex + 1) * currentPageSize, totalRows);
  return (
    <div className="w-full max-w-full overflow-hidden rounded-md border bg-white">
      <div className="w-full overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="truncate"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="truncate"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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

      {!isLoading && !error && totalRows > 0 && (
        <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Information */}
          <p className="text-sm text-neutral-500">
            <span className="font-medium text-neutral-900">{rowPerPage}</span>{" "}
            Rows per page
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1 text-sm">
              <span className="rounded-md bg-neutral-900 px-3 py-2 font-medium text-white">
                {pageIndex + 1}
              </span>

              <span className="px-1 text-neutral-500">of</span>

              <span className="px-2 text-neutral-700">
                {table.getPageCount()}
              </span>
            </div>

            <Button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="lg"
              variant="outline"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
