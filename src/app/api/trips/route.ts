import { NextRequest, NextResponse } from "next/server";
import { UserRole, TripStatus } from "@/types";

// Mock data for the logistics dashboard challenge
const mockTrips = [
  {
    id: "1",
    origin: "New York, NY",
    destination: "Boston, MA",
    cargoType: "Electronics",
    status: TripStatus.ASSIGNED,
    driverId: "1",
    createdAt: new Date("2024-01-15T08:00:00Z"),
    updatedAt: new Date("2024-01-15T08:00:00Z"),
    driver: {
      id: "1",
      name: "John Smith",
      email: "john.driver@noam.com",
      role: UserRole.DRIVER,
    },
    proofOfDelivery: [],
  },
  {
    id: "2",
    origin: "Los Angeles, CA",
    destination: "San Francisco, CA",
    cargoType: "Furniture",
    status: TripStatus.IN_TRANSIT,
    driverId: "1",
    createdAt: new Date("2024-01-14T10:30:00Z"),
    updatedAt: new Date("2024-01-14T14:20:00Z"),
    driver: {
      id: "1",
      name: "John Smith",
      email: "john.driver@noam.com",
      role: UserRole.DRIVER,
    },
    proofOfDelivery: [],
  },
  {
    id: "3",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    cargoType: "Medical Supplies",
    status: TripStatus.DELIVERED,
    driverId: "2",
    createdAt: new Date("2024-01-13T09:15:00Z"),
    updatedAt: new Date("2024-01-13T16:45:00Z"),
    driver: {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.driver@noam.com",
      role: UserRole.DRIVER,
    },
    proofOfDelivery: [
      {
        id: "1",
        tripId: "3",
        imageUrl:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjBmOWZmIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZmY2ZmYiIHN0cm9rZT0iIzM5OGVjYyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiNlZjQ0NDQiLz4KPHN2ZyB4PSIxODAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IndoaXRlIj4KICA8cGF0aCBkPSJNMTIgMmw0IDRoNGwtNCA0IDQgNGgtNGwtNC00LTQgNGgtNGw0LTQtNC00aDRsNC00eiIvPgo8L3N2Zz4KPHR4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NZWRpY2FsIFN1cHBsaWVzPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjM3NTg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9vZiBvZiBEZWxpdmVyeTwvdGV4dD4KPC9zdmc+",
        fileName: "pod-medical-supplies.jpg",
        uploadedAt: new Date("2024-01-13T16:45:00Z"),
      },
    ],
  },
  {
    id: "4",
    origin: "Miami, FL",
    destination: "Orlando, FL",
    cargoType: "Food & Beverages",
    status: TripStatus.ASSIGNED,
    driverId: "1",
    createdAt: new Date("2024-01-16T07:00:00Z"),
    updatedAt: new Date("2024-01-16T07:00:00Z"),
    driver: {
      id: "1",
      name: "John Smith",
      email: "john.driver@noam.com",
      role: UserRole.DRIVER,
    },
    proofOfDelivery: [],
  },
  {
    id: "5",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    cargoType: "Textiles",
    status: TripStatus.DELIVERED,
    driverId: "1",
    createdAt: new Date("2024-01-12T11:20:00Z"),
    updatedAt: new Date("2024-01-12T18:30:00Z"),
    driver: {
      id: "1",
      name: "John Smith",
      email: "john.driver@noam.com",
      role: UserRole.DRIVER,
    },
    proofOfDelivery: [
      {
        id: "2",
        tripId: "5",
        imageUrl:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZmVmM2M3Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZWY5YzMiIHN0cm9rZT0iIzg0Y2M5OSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iMTUiIGZpbGw9IiNmNTllMGIiLz4KPGNpcmNsZSBjeD0iMjUwIiBjeT0iMTIwIiByPSIxNSIgZmlsbD0iI2Y1OWUwYiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNDAiIHI9IjE1IiBmaWxsPSIjZjU5ZTBiIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMzNzQxNTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRleHRpbGVzPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjM3NTg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9vZiBvZiBEZWxpdmVyeTwvdGV4dD4KPC9zdmc+",
        fileName: "pod-textiles.jpg",
        uploadedAt: new Date("2024-01-12T18:30:00Z"),
      },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role") as UserRole;
    const driverId = searchParams.get("driverId");

    let trips = mockTrips;

    if (role === UserRole.DRIVER && driverId) {
      // Driver can only see their own trips
      trips = mockTrips.filter((trip) => trip.driverId === driverId);
    } else if (role === UserRole.SHIPPER) {
      // Shipper can see all trips
      trips = mockTrips;
    } else {
      return NextResponse.json(
        { error: "Invalid role or missing driverId" },
        { status: 400 }
      );
    }

    return NextResponse.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, cargoType, driverId } = body;

    if (!origin || !destination || !cargoType || !driverId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create mock trip for demonstration
    const newTrip = {
      id: Date.now().toString(),
      origin,
      destination,
      cargoType,
      driverId,
      status: TripStatus.ASSIGNED,
      createdAt: new Date(),
      updatedAt: new Date(),
      driver: {
        id: driverId,
        name: "Mock Driver",
        email: "driver@example.com",
        role: UserRole.DRIVER,
      },
      proofOfDelivery: [],
    };

    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}
