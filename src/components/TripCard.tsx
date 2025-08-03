"use client";

import { useState } from "react";
import { Trip, TripStatus, UserRole } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Upload,
  Loader2,
  MapPin,
  Package,
  User,
  Camera,
  ChevronRight,
} from "lucide-react";

interface TripCardProps {
  trip: Trip;
  currentRole: UserRole;
  currentUserId: string;
  uploading: string | null;
  onStatusUpdate: (tripId: string, newStatus: TripStatus) => void;
  onImageUpload: (tripId: string, file: File) => void;
}

const getStatusColor = (status: TripStatus) => {
  switch (status) {
    case TripStatus.ASSIGNED:
      return "default";
    case TripStatus.IN_TRANSIT:
      return "warning";
    case TripStatus.DELIVERED:
      return "success";
    default:
      return "default";
  }
};

const getStatusText = (status: TripStatus) => {
  switch (status) {
    case TripStatus.ASSIGNED:
      return "Assigned";
    case TripStatus.IN_TRANSIT:
      return "In Transit";
    case TripStatus.DELIVERED:
      return "Delivered";
    default:
      return status;
  }
};

const getCargoPlaceholder = (cargoType: string) => {
  const type = cargoType.toLowerCase();

  if (type.includes("electronics")) {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjNmNGY2Ii8+CjxyZWN0IHg9IjMwIiB5PSIzMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI5MCIgZmlsbD0iIzM3NDE1MSIgcng9IjQiLz4KPHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjMWY5OWZmIiByeD0iMiIvPgo8dGV4dCB4PSIxMDAiIHk9IjgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FbGVjdHJvbmljczwvdGV4dD4KPC9zdmc+";
  } else if (type.includes("medical")) {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjBmOWZmIi8+CjxyZWN0IHg9IjUwIiB5PSI0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2VmZjZmZiIgc3Ryb2tlPSIjMzk4ZWNjIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iNjAiIHI9IjE1IiBmaWxsPSIjZWY0NDQ0Ii8+CjxwYXRoIGQ9Ik05NSA2MGg1bTAtNXY1djUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NZWRpY2FsPC90ZXh0Pgo8L3N2Zz4=";
  } else if (type.includes("food")) {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZmVmM2M3Ii8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2ZlZjljMyIgc3Ryb2tlPSIjODRjYzk5IiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iODAiIGN5PSI2NSIgcj0iOCIgZmlsbD0iI2Y1OWUwYiIvPgo8Y2lyY2xlIGN4PSIxMjAiIGN5PSI2NSIgcj0iOCIgZmlsbD0iI2Y1OWUwYiIvPgo8dGV4dCB4PSIxMDAiIHk9IjkwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMzNzQxNTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvb2Q8L3RleHQ+Cjwvc3ZnPg==";
  } else if (type.includes("furniture")) {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZmVmMmYyIi8+CjxyZWN0IHg9IjQwIiB5PSI2MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzkyNDAwZSIgcng9IjQiLz4KPHJlY3QgeD0iNDAiIHk9IjUwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjYjQ1MzA5IiByeD0iMiIvPgo8cmVjdCB4PSI0NSIgeT0iMTAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMjAiIGZpbGw9IiM5MjQwMGUiLz4KPHJlY3QgeD0iMTQ1IiB5PSIxMDAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzkyNDAwZSIvPgo8dGV4dCB4PSIxMDAiIHk9IjEzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GdXJuaXR1cmU8L3RleHQ+Cjwvc3ZnPg==";
  } else if (type.includes("textiles")) {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZmVmM2M3Ii8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2ZlZjljMyIgc3Ryb2tlPSIjODRjYzk5IiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iNzAiIGN5PSI2NSIgcj0iNiIgZmlsbD0iI2Y1OWUwYiIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI2NSIgcj0iNiIgZmlsbD0iI2Y1OWUwYiIvPgo8Y2lyY2xlIGN4PSIxMzAiIGN5PSI2NSIgcj0iNiIgZmlsbD0iI2Y1OWUwYiIvPgo8dGV4dCB4PSIxMDAiIHk9IjkwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMzNzQxNTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRleHRpbGVzPC90ZXh0Pgo8L3N2Zz4=";
  } else {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjNmNGY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzllYTNhZiIgcng9IjQiLz4KPHR4dCB4PSIxMDAiIHk9IjgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DYXJnbzwvdGV4dD4KPC9zdmc+";
  }
};

export function TripCard({
  trip,
  currentRole,
  currentUserId,
  uploading,
  onStatusUpdate,
  onImageUpload,
}: TripCardProps) {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const handleStatusUpdate = (newStatus: TripStatus) => {
    onStatusUpdate(trip.id, newStatus);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(trip.id, file);
    }
  };

  const getNextStatus = (currentStatus: TripStatus): TripStatus | null => {
    switch (currentStatus) {
      case TripStatus.ASSIGNED:
        return TripStatus.IN_TRANSIT;
      case TripStatus.IN_TRANSIT:
        return TripStatus.DELIVERED;
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus(trip.status);
  const canUpdateStatus =
    currentRole === UserRole.DRIVER &&
    trip.driverId === currentUserId &&
    nextStatus;

  return (
    <div className="border-b border-border last:border-b-0">
      <div className="px-6 py-4">
        {/* Compact Trip Summary Row */}
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                #{trip.id}
              </span>
              <Badge variant={getStatusColor(trip.status) as any}>
                {getStatusText(trip.status)}
              </Badge>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">{trip.origin}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="font-medium">{trip.destination}</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>{trip.cargoType}</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{trip.driver.name}</span>
            </div>

            {trip.proofOfDelivery.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Camera className="h-3 w-3" />
                <span>POD</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {canUpdateStatus && (
              <Button
                onClick={() => handleStatusUpdate(nextStatus)}
                size="sm"
                className="text-xs"
              >
                Mark as {getStatusText(nextStatus)}
              </Button>
            )}

            {currentRole === UserRole.DRIVER &&
              trip.driverId === currentUserId &&
              trip.status === TripStatus.DELIVERED &&
              trip.proofOfDelivery.length === 0 && (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading === trip.id}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={uploading === trip.id}
                    className="text-xs"
                  >
                    {uploading === trip.id ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-1 h-3 w-3" />
                        Upload POD
                      </>
                    )}
                  </Button>
                </div>
              )}
          </div>
        </div>

        {/* Accordion for Details */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={trip.id} className="border-none">
            <AccordionTrigger className="hover:no-underline py-2 text-sm text-muted-foreground">
              <span>View Details</span>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-4">
              {/* Detailed Trip Information */}
              <div className="space-y-6">
                {/* Mobile Route Info */}
                <div className="sm:hidden space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Route:</span>
                    <span className="text-muted-foreground">
                      {trip.origin} → {trip.destination}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Cargo:</span>
                    <span className="text-muted-foreground">
                      {trip.cargoType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Driver:</span>
                    <span className="text-muted-foreground">
                      {trip.driver.name}
                    </span>
                  </div>
                </div>

                {/* Trip Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground">
                      Trip Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge
                          variant={getStatusColor(trip.status) as any}
                          className="text-xs"
                        >
                          {getStatusText(trip.status)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trip ID:</span>
                        <span className="font-mono text-xs">#{trip.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="text-xs">
                          {new Date(trip.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Updated:</span>
                        <span className="text-xs">
                          {new Date(trip.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground">
                      Driver Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{trip.driver.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-xs text-muted-foreground">
                          {trip.driver.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Driver ID:
                        </span>
                        <span className="font-mono text-xs">
                          #{trip.driverId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proof of Delivery Section */}
                {trip.proofOfDelivery.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Proof of Delivery
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {trip.proofOfDelivery.map((pod) => (
                        <div key={pod.id} className="relative group">
                          <img
                            src={
                              imageError[pod.id]
                                ? getCargoPlaceholder(trip.cargoType)
                                : pod.imageUrl
                            }
                            alt={`Proof of delivery for ${trip.cargoType}`}
                            className="w-full aspect-square object-cover rounded-lg border border-border cursor-pointer hover:opacity-80 transition-opacity"
                            onError={() =>
                              setImageError((prev) => ({
                                ...prev,
                                [pod.id]: true,
                              }))
                            }
                            onClick={() => window.open(pod.imageUrl, "_blank")}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to view
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground truncate">
                            {pod.fileName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(pod.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* POD Upload Reminder */}
                {trip.status === TripStatus.DELIVERED &&
                  trip.proofOfDelivery.length === 0 &&
                  currentRole === UserRole.DRIVER &&
                  trip.driverId === currentUserId && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-yellow-800">
                        <Camera className="h-4 w-4" />
                        <span className="font-medium text-sm">
                          Proof of Delivery Required
                        </span>
                      </div>
                      <p className="text-xs text-yellow-700 mt-1">
                        Please upload proof of delivery to complete this trip.
                      </p>
                    </div>
                  )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
