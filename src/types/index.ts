export enum UserRole {
  DRIVER = 'DRIVER',
  SHIPPER = 'SHIPPER'
}

export enum TripStatus {
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED'
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface Trip {
  id: string
  origin: string
  destination: string
  cargoType: string
  status: TripStatus
  driverId: string
  createdAt: Date
  updatedAt: Date
  driver: User
  proofOfDelivery: ProofOfDelivery[]
}

export interface ProofOfDelivery {
  id: string
  tripId: string
  imageUrl: string
  fileName: string
  uploadedAt: Date
}
