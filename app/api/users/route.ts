import { type NextRequest, NextResponse } from "next/server"

// Mock users data
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    username: "viewer1",
    email: "viewer1@example.com",
    role: "viewer",
    createdAt: "2024-01-05T00:00:00Z",
    lastLogin: "2024-01-14T15:20:00Z",
  },
  {
    id: "3",
    username: "manager",
    email: "manager@example.com",
    role: "admin",
    createdAt: "2024-01-10T00:00:00Z",
    lastLogin: "2024-01-15T08:45:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json(mockUsers)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, role } = await request.json()

    const newUser = {
      id: String(mockUsers.length + 1),
      username,
      email,
      role,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
