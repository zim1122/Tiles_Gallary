import { NextResponse } from "next/server";
import { getTileById } from "@/lib/tiles";

export async function GET(_, { params }) {
  try {
    const { id } = await params;
    const tile = getTileById(id);

    if (!tile) {
      return NextResponse.json({ error: "Tile not found" }, { status: 404 });
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
    return NextResponse.json(tile);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tile" }, { status: 500 });
  }
}
