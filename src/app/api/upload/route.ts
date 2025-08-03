import { NextRequest, NextResponse } from "next/server";
import { ProofOfDelivery } from "@/types";

// Mock storage for proof of delivery - simulating file upload for the challenge
const mockProofOfDelivery: ProofOfDelivery[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const tripId = data.get("tripId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!tripId) {
      return NextResponse.json(
        { error: "Trip ID is required" },
        { status: 400 }
      );
    }

    // Convert file to base64 for mock storage (simulating file upload)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    // Create mock proof of delivery
    const proofOfDelivery = {
      id: Date.now().toString(),
      tripId,
      imageUrl: dataUrl,
      fileName: file.name,
      uploadedAt: new Date(),
    };

    // Store in mock storage
    mockProofOfDelivery.push(proofOfDelivery);

    return NextResponse.json({
      message: "File uploaded successfully",
      proofOfDelivery,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
