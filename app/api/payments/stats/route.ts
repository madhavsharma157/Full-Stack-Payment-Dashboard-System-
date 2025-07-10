import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock statistics data
    const stats = {
      totalRevenue: 125430.5,
      totalTransactions: 1247,
      failedTransactions: 23,
      successRate: 98.2,
      revenueGrowth: 12.5,
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
