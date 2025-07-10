"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { RevenueChart } from "@/components/revenue-chart"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const reportData = {
    totalRevenue: 125430.5,
    revenueGrowth: 12.5,
    totalTransactions: 1247,
    transactionGrowth: -2.3,
    averageTransaction: 100.58,
    avgGrowth: 15.2,
    failureRate: 1.8,
    failureChange: -0.5,
  }

  const exportReport = () => {
    // Mock export functionality
    const csvContent = `Report Generated: ${new Date().toISOString()}
Total Revenue: $${reportData.totalRevenue}
Total Transactions: ${reportData.totalTransactions}
Average Transaction: $${reportData.averageTransaction}
Failure Rate: ${reportData.failureRate}%`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "payment-report.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Analytics and insights for your payment system</p>
        </div>
        <Button onClick={exportReport}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Customize your report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select defaultValue="revenue">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="transactions">Transaction Report</SelectItem>
                  <SelectItem value="failures">Failure Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">From Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.to && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${reportData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+{reportData.revenueGrowth}%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              <span className="text-red-600">{reportData.transactionGrowth}%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${reportData.averageTransaction}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+{reportData.avgGrowth}%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failure Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.failureRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">{reportData.failureChange}%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend Analysis</CardTitle>
            <CardDescription>Daily revenue performance over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
