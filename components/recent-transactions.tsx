"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentTransactions = [
  {
    id: "TXN001",
    user: "John Doe",
    email: "john@example.com",
    amount: 250.0,
    status: "success",
  },
  {
    id: "TXN002",
    user: "Jane Smith",
    email: "jane@example.com",
    amount: 150.0,
    status: "pending",
  },
  {
    id: "TXN003",
    user: "Bob Johnson",
    email: "bob@example.com",
    amount: 350.0,
    status: "success",
  },
  {
    id: "TXN004",
    user: "Alice Brown",
    email: "alice@example.com",
    amount: 75.0,
    status: "failed",
  },
  {
    id: "TXN005",
    user: "Charlie Wilson",
    email: "charlie@example.com",
    amount: 500.0,
    status: "success",
  },
]

export function RecentTransactions() {
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
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder-user.jpg`} alt={transaction.user} />
            <AvatarFallback>
              {transaction.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.user}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm font-medium">${transaction.amount.toFixed(2)}</p>
            {getStatusBadge(transaction.status)}
          </div>
        </div>
      ))}
    </div>
  )
}
