"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { TransactionDialog } from "@/components/transaction-dialog"

interface Transaction {
  id: string
  amount: number
  status: "success" | "failed" | "pending"
  method: string
  receiver: string
  createdAt: string
  description?: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    method: "all",
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/payments")
        if (response.ok) {
          const data = await response.json()
          setTransactions(data)
          setFilteredTransactions(data)
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  useEffect(() => {
    let filtered = transactions

    if (filters.search) {
      filtered = filtered.filter(
        (t) =>
          t.id.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.receiver.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((t) => t.status === filters.status)
    }

    if (filters.method !== "all") {
      filtered = filtered.filter((t) => t.method === filters.method)
    }

    if (filters.dateFrom) {
      filtered = filtered.filter((t) => new Date(t.createdAt) >= filters.dateFrom!)
    }

    if (filters.dateTo) {
      filtered = filtered.filter((t) => new Date(t.createdAt) <= filters.dateTo!)
    }

    setFilteredTransactions(filtered)
    setCurrentPage(1)
  }, [filters, transactions])

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

  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  const exportToCSV = () => {
    const headers = ["ID", "Amount", "Status", "Method", "Receiver", "Date"]
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map((t) =>
        [t.id, t.amount, t.status, t.method, t.receiver, format(new Date(t.createdAt), "yyyy-MM-dd HH:mm:ss")].join(
          ",",
        ),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Manage and monitor all payment transactions</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter transactions by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by ID or receiver"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={filters.method} onValueChange={(value) => setFilters({ ...filters, method: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateFrom && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom}
                    onSelect={(date) => setFilters({ ...filters, dateFrom: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateTo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo ? format(filters.dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo}
                    onSelect={(date) => setFilters({ ...filters, dateTo: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{transaction.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.createdAt), "MMM dd, yyyy HH:mm")}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{transaction.method}</p>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.receiver}</p>
                    <p className="text-sm text-muted-foreground">Receiver</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">{getStatusBadge(transaction.status)}</div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedTransaction && (
        <TransactionDialog
          transaction={selectedTransaction}
          open={!!selectedTransaction}
          onOpenChange={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  )
}
