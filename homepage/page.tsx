'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ReceiptData = {
  warehouseNumber: string
  poNumber: string
  mrNumber: string
}

export default function Homepage() {
  const [receipts, setReceipts] = useState<ReceiptData[]>([
    { warehouseNumber: "1", poNumber: "2", mrNumber: "3" },
    { warehouseNumber: "4", poNumber: "5", mrNumber: "6" },
    { warehouseNumber: "7", poNumber: "8", mrNumber: "9" },
  ])

  const addReceipt = () => {
    const newReceipt = {
      warehouseNumber: (receipts.length + 1).toString(),
      poNumber: (receipts.length + 2).toString(),
      mrNumber: (receipts.length + 3).toString(),
    }
    setReceipts([...receipts, newReceipt])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Homepage</h1>
      
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link href="/warehouse">
            <Button variant="outline">Warehouse Receipt</Button>
          </Link>
          <Link href="/purchaseorder">
            <Button variant="outline">Purchase Order</Button>
          </Link>
          <Link href="/materialreceipt">
            <Button variant="outline">Material Receipt</Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Warehouse Receipt</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Warehouse Receipt</DialogTitle>
                <DialogDescription>
                  This feature is not yet implemented. Check back later!
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Purchase Order</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Purchase Order</DialogTitle>
                <DialogDescription>
                  This feature is not yet implemented. Check back later!
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Material Receipt</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Material Receipt</DialogTitle>
                <DialogDescription>
                  This feature is not yet implemented. Check back later!
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Warehouse Number</TableHead>
              <TableHead className="font-bold">PO Number</TableHead>
              <TableHead className="font-bold">MR Number</TableHead>
              <TableHead className="font-bold w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipts.map((receipt, index) => (
              <TableRow key={index}>
                <TableCell>{receipt.warehouseNumber}</TableCell>
                <TableCell>{receipt.poNumber}</TableCell>
                <TableCell>{receipt.mrNumber}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-right">
        <Button onClick={addReceipt}>
          <Plus className="mr-2 h-4 w-4" /> Add Receipt
        </Button>
      </div>
    </div>
  )
}