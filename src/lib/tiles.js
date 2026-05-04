import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

export function getAllTiles() {
  const fileContents = fs.readFileSync(DB_PATH, "utf8");
  const data = JSON.parse(fileContents);
  return data.tiles ?? [];
}

export function getFeaturedTiles(limit = 4) {
  return getAllTiles().filter((tile) => tile.featured).slice(0, limit);
}

export function getTileById(id) {
  return getAllTiles().find((tile) => tile.id === id) ?? null;
}
