import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock user for demo
const DEMO_USER = {
  id: "1",
  username: "admin",
  password: "admin123", // In production, this should be hashed
  role: "admin",
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      // Generate JWT token
      const token = jwt.sign(
        {
          id: DEMO_USER.id,
          username: DEMO_USER.username,
          role: DEMO_USER.role,
        },
        JWT_SECRET,
        { expiresIn: "24h" },
      )

      return NextResponse.json({
        token,
        user: {
          id: DEMO_USER.id,
          username: DEMO_USER.username,
          role: DEMO_USER.role,
        },
      })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
