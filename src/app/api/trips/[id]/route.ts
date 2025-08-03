import { NextRequest, NextResponse } from "next/server";
import { UserRole, TripStatus } from "@/types";

// Mock trip data - simulating in-memory storage for the challenge
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
        imageUrl: "https://picsum.photos/400/300?random=10",
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
        imageUrl: "https://picsum.photos/400/300?random=11",
        fileName: "pod-textiles.jpg",
        uploadedAt: new Date("2024-01-12T18:30:00Z"),
      },
    ],
  },
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, driverId } = body;

    if (!status || !Object.values(TripStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Find the trip to update
    const trip = mockTrips.find((trip) => trip.id === id);

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Verify that the driver is updating their own trip
    if (driverId && trip.driverId !== driverId) {
      return NextResponse.json(
        { error: "Unauthorized to update this trip" },
        { status: 403 }
      );
    }

    // Update the trip status
    trip.status = status;
    trip.updatedAt = new Date();

    return NextResponse.json(trip);
  } catch (error) {
    console.error("Error updating trip:", error);
    return NextResponse.json(
      { error: "Failed to update trip" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const trip = mockTrips.find((trip) => trip.id === id);

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(trip);
  } catch (error) {
    console.error("Error fetching trip:", error);
    return NextResponse.json(
      { error: "Failed to fetch trip" },
      { status: 500 }
    );
  }
}
