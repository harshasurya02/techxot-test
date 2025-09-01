// /lib/bff/authors.ts
import fs from "fs/promises";
import path from "path";
import { Author } from "../models/article";

const DATA_DIR = path.join(process.cwd(), "src/mocks");

export async function listAuthors(): Promise<Author[]> {
  const raw = await fs.readFile(path.join(DATA_DIR, "authors.json"), "utf-8");
  return JSON.parse(raw);
}
