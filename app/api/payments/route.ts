import { type NextRequest, NextResponse } from "next/server"

// Mock data for demo
const mockTransactions = [
  {
    id: "TXN001",
    amount: 250.0,
    status: "success",
    method: "credit_card",
    receiver: "john.doe@example.com",
    createdAt: "2024-01-15T10:30:00Z",
    description: "Payment for services",
  },
  {
    id: "TXN002",
    amount: 150.0,
    status: "pending",
    method: "paypal",
    receiver: "jane.smith@example.com",
    createdAt: "2024-01-15T09:15:00Z",
    description: "Monthly subscription payment",
  },
  {
    id: "TXN003",
    amount: 350.0,
    status: "success",
    method: "bank_transfer",
    receiver: "bob.johnson@example.com",
    createdAt: "2024-01-14T16:45:00Z",
    description: "Invoice payment",
  },
  {
    id: "TXN004",
    amount: 75.0,
    status: "failed",
    method: "credit_card",
    receiver: "alice.brown@example.com",
    createdAt: "2024-01-14T14:20:00Z",
    description: "Payment declined - insufficient funds",
  },
  {
    id: "TXN005",
    amount: 500.0,
    status: "success",
    method: "debit_card",
    receiver: "charlie.wilson@example.com",
    createdAt: "2024-01-13T11:30:00Z",
    description: "Product purchase",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const method = searchParams.get("method")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredTransactions = [...mockTransactions]

    if (status && status !== "all") {
      filteredTransactions = filteredTransactions.filter((t) => t.status === status)
    }

    if (method && method !== "all") {
      filteredTransactions = filteredTransactions.filter((t) => t.method === method)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

    return NextResponse.json(paginatedTransactions)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { amount, method, receiver, status, description } = await request.json()

    const newTransaction = {
      id: `TXN${String(mockTransactions.length + 1).padStart(3, "0")}`,
      amount: Number.parseFloat(amount),
      status,
      method,
      receiver,
      createdAt: new Date().toISOString(),
      description: description || "",
    }

    mockTransactions.unshift(newTransaction)

    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
