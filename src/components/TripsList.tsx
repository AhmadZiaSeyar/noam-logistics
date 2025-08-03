"use client";

import { Trip, TripStatus, UserRole } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { TripCard } from "./TripCard";

interface TripsListProps {
  trips: Trip[];
  currentRole: UserRole;
  currentUserId: string;
  uploading: string | null;
  onStatusUpdate: (tripId: string, newStatus: TripStatus) => void;
  onImageUpload: (tripId: string, file: File) => void;
}

export function TripsList({
  trips,
  currentRole,
  currentUserId,
  uploading,
  onStatusUpdate,
  onImageUpload,
}: TripsListProps) {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="bg-muted/50 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent rounded-lg">
              <Package className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-card-foreground text-lg font-semibold">
                {currentRole === UserRole.DRIVER ? "My Trips" : "All Trips"}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                {currentRole === UserRole.DRIVER
                  ? "Manage your assigned deliveries"
                  : "Monitor all logistics operations"}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground border-border"
          >
            {trips.length} trips
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {trips.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No trips found
            </h3>
            <p className="text-muted-foreground">
              {currentRole === UserRole.DRIVER
                ? "You don't have any assigned trips yet."
                : "No trips are currently in the system."}
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                currentRole={currentRole}
                currentUserId={currentUserId}
                uploading={uploading}
                onStatusUpdate={onStatusUpdate}
                onImageUpload={onImageUpload}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
