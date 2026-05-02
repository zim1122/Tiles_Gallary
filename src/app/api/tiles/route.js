import { NextResponse } from "next/server";
import { getAllTiles } from "@/lib/tiles";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    let tiles = getAllTiles();

    if (search) {
      const lowerSearch = search.toLowerCase();
      tiles = tiles.filter(
        (tile) =>
          tile.title.toLowerCase().includes(lowerSearch) ||
        tile.category.toLowerCase().includes(lowerSearch) ||
          tile.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json(tiles);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tiles" }, { status: 500 });
  }
}
