import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in production, this would be a real database
const mockUsers = {
  staff: [
    { id: "1", email: "teacher@omobolaschool.edu", password: "password123", name: "John Smith", role: "staff" },
    { id: "2", email: "admin@omobolaschool.edu", password: "admin123", name: "Sarah Johnson", role: "staff" },
  ],
  student: [
    { id: "STU001", email: "student1@omobolaschool.edu", password: "student123", name: "Alice Brown", role: "student" },
    { id: "STU002", email: "student2@omobolaschool.edu", password: "student456", name: "Bob Wilson", role: "student" },
  ],
  parent: [
    { id: "1", email: "parent1@gmail.com", password: "parent123", name: "Mary Brown", role: "parent" },
    { id: "2", email: "parent2@gmail.com", password: "parent456", name: "David Wilson", role: "parent" },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType, studentId } = await request.json()

    // Validate required fields
    if (!password || (!email && !studentId)) {
      return NextResponse.json({ error: "Email/Student ID and password are required" }, { status: 400 })
    }

    if (!userType || !["staff", "student", "parent"].includes(userType)) {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }

    // Find user in mock database
    let user = null
    const users = mockUsers[userType as keyof typeof mockUsers]

    if (userType === "student" && studentId) {
      // For students, allow login with either email or student ID
      user = users.find((u: any) => (u.email === email || u.id === studentId) && u.password === password)
    } else {
      // For staff and parents, use email
      user = users.find((u: any) => u.email === email && u.password === password)
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In production, you would:
    // 1. Hash and compare passwords properly
    // 2. Generate JWT tokens
    // 3. Set secure cookies
    // 4. Implement proper session management

    // For now, return success with user data
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectUrl: `/dashboard/${userType}`,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
