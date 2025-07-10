"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan 1", revenue: 4000 },
  { name: "Jan 2", revenue: 3000 },
  { name: "Jan 3", revenue: 5000 },
  { name: "Jan 4", revenue: 2780 },
  { name: "Jan 5", revenue: 1890 },
  { name: "Jan 6", revenue: 2390 },
  { name: "Jan 7", revenue: 3490 },
  { name: "Jan 8", revenue: 4000 },
  { name: "Jan 9", revenue: 3000 },
  { name: "Jan 10", revenue: 5000 },
  { name: "Jan 11", revenue: 2780 },
  { name: "Jan 12", revenue: 1890 },
  { name: "Jan 13", revenue: 2390 },
  { name: "Jan 14", revenue: 3490 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
