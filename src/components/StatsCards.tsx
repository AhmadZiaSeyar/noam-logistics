"use client";

import { Trip, TripStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, MapPin } from "lucide-react";

interface StatsCardsProps {
  trips: Trip[];
}

export function StatsCards({ trips }: StatsCardsProps) {
  const totalTrips = trips.length;
  const inTransitTrips = trips.filter(
    (trip) => trip.status === TripStatus.IN_TRANSIT
  ).length;
  const deliveredTrips = trips.filter(
    (trip) => trip.status === TripStatus.DELIVERED
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
      <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">
            Total Trips
          </CardTitle>
          <div className="p-2 bg-accent rounded-lg">
            <Truck className="h-4 w-4 text-accent-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {totalTrips}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Active shipments</p>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">
            In Transit
          </CardTitle>
          <div className="p-2 bg-chart-3/10 rounded-lg">
            <Package className="h-4 w-4 text-chart-3" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {inTransitTrips}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Currently moving</p>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">
            Delivered
          </CardTitle>
          <div className="p-2 bg-chart-2/10 rounded-lg">
            <MapPin className="h-4 w-4 text-chart-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {deliveredTrips}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Successfully completed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
