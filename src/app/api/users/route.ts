import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/types";

// Mock users data for the logistics dashboard challenge
const mockUsers = [
  {
    id: "1",
    email: "john.driver@noam.com",
    name: "John Smith",
    role: UserRole.DRIVER,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "2",
    email: "admin.shipper@noam.com",
    name: "Admin Shipper",
    role: UserRole.SHIPPER,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "3",
    email: "sarah.driver@noam.com",
    name: "Sarah Johnson",
    role: UserRole.DRIVER,
    createdAt: new Date("2024-01-02T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role") as UserRole;

    let users = mockUsers;

    if (role && Object.values(UserRole).includes(role)) {
      users = mockUsers.filter((user) => user.role === role);
    }

    // Sort by name
    users.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, role } = body;

    if (!email || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Create mock user for demonstration
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In a real app, this would be saved to a database
    // For the challenge, we just return the mock user
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
