"use client";

import { useState, useEffect } from "react";
import { UserRole, TripStatus, type Trip, type User } from "@/types";
import { DashboardHeader } from "./DashboardHeader";
import { StatsCards } from "./StatsCards";
import { TripsList } from "./TripsList";

// User data - in a real app this would come from authentication
const users: User[] = [
  {
    id: "1",
    email: "john.driver@noam.com",
    name: "John Smith",
    role: UserRole.DRIVER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "admin.shipper@noam.com",
    name: "Admin Shipper",
    role: UserRole.SHIPPER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Dashboard() {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.DRIVER);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const currentUser =
    users.find((user) => user.role === currentRole) || users[0];

  // Fetch trips when role changes
  useEffect(() => {
    fetchTrips();
  }, [currentRole]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        role: currentRole,
        ...(currentRole === UserRole.DRIVER && { driverId: currentUser.id }),
      });

      const response = await fetch(`/api/trips?${params}`);
      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      } else {
        console.error("Failed to fetch trips from API");
        setTrips([]);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (tripId: string, newStatus: TripStatus) => {
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          driverId: currentUser.id,
        }),
      });

      if (response.ok) {
        const updatedTrip = await response.json();
        setTrips((prevTrips) =>
          prevTrips.map((trip) => (trip.id === tripId ? updatedTrip : trip))
        );
      } else {
        console.error("Failed to update trip status");
      }
    } catch (error) {
      console.error("Error updating trip status:", error);
    }
  };

  const handleImageUpload = async (tripId: string, file: File) => {
    setUploading(tripId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tripId", tripId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        // Update the trip with the new proof of delivery
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  proofOfDelivery: [
                    ...trip.proofOfDelivery,
                    result.proofOfDelivery,
                  ],
                }
              : trip
          )
        );
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(null);
    }
  };

  // Filter trips based on role
  const filteredTrips =
    currentRole === UserRole.DRIVER
      ? trips.filter((trip) => trip.driverId === currentUser.id)
      : trips;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          currentUser={currentUser}
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
        />

        <StatsCards trips={filteredTrips} />

        <TripsList
          trips={filteredTrips}
          currentRole={currentRole}
          currentUserId={currentUser.id}
          uploading={uploading}
          onStatusUpdate={handleStatusUpdate}
          onImageUpload={handleImageUpload}
        />
      </div>
    </div>
  );
}
