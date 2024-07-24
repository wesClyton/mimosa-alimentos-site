"use client"

import { Table } from "@tanstack/react-table"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "../../input"
import { Button } from "../../button"
import { DataTableViewOptions } from "./data-table-view-options"
import { BsCrosshair } from "react-icons/bs"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export const statuses = [
  {
    value: true,
    label: "Ativo",
    // icon: ArrowDownIcon,
  },
  {
    value: false,
    label: "Inativo",
    // icon: ArrowDownIcon,
  },
]

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtar..."
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("active") && (
          <DataTableFacetedFilter column={table.getColumn("active")} title="Status" options={statuses} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Limpar
            <BsCrosshair className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
