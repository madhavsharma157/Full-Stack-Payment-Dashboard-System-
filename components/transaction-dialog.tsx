"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface Transaction {
  id: string
  amount: number
  status: "success" | "failed" | "pending"
  method: string
  receiver: string
  createdAt: string
  description?: string
}

interface TransactionDialogProps {
  transaction: Transaction
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDialog({ transaction, open, onOpenChange }: TransactionDialogProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>Complete information about transaction {transaction.id}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
              <p className="text-sm">{transaction.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              {getStatusBadge(transaction.status)}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="text-lg font-semibold">${transaction.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
              <p className="text-sm capitalize">{transaction.method.replace("_", " ")}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Receiver</p>
            <p className="text-sm">{transaction.receiver}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
            <p className="text-sm">{format(new Date(transaction.createdAt), "PPP 'at' p")}</p>
          </div>

          {transaction.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-sm">{transaction.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
