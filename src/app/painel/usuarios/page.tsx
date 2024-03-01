import Breadcrumbs from "../components/breadcrumb"
import { DataTable } from "../components/ui/custom/data-table"
import { ColumnDef } from "@tanstack/react-table"

const breadcrumbs = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "Usuarios",
  },
]

const data: Sales[] = [
  {
    id: "1",
    product: "Laptop Dell",
    quantity: 2,
    amount: 55000,
    status: "success",
  },
  {
    id: "2",
    product: "PlayStation",
    quantity: 5,
    amount: 35000,
    status: "processing",
  },
  {
    id: "3",
    product: "Mobile Samsung Galaxy S23",
    quantity: 2,
    amount: 75000,
    status: "success",
  },
  {
    id: "4",
    product: "Gaming PC",
    quantity: 2,
    amount: 155000,
    status: "success",
  },
  {
    id: "5",
    product: "Mac",
    quantity: 2,
    amount: 55000,
    status: "failed",
  },
  {
    id: "6",
    product: "Smart Watch",
    quantity: 4,
    amount: 55000,
    status: "success",
  },
  {
    id: "7",
    product: "XBox",
    quantity: 5,
    amount: 45000,
    status: "processing",
  },
  {
    id: "8",
    product: "IPad",
    quantity: 2,
    amount: 55000,
    status: "success",
  },
  {
    id: "9",
    product: "Ear Buds",
    quantity: 2,
    amount: 10000,
    status: "success",
  },
  {
    id: "10",
    product: "SSD",
    quantity: 2,
    amount: 15000,
    status: "failed",
  },
]

export type Sales = {
  id: string
  product: string
  amount: number
  quantity: number
  status: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Sales>[] = [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

export default function UserPage() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="text-3xl font-bold tracking-tight my-4">Usuarios</h2>

      <div className="w-full">
        <DataTable data={data} columns={columns}></DataTable>
      </div>
    </div>
  )
}
