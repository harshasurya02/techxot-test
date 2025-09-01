// /lib/bff/topics.ts
import fs from "fs/promises";
import path from "path";
import { Topic } from "../models/article";
const DATA_DIR = path.join(process.cwd(), "src/mocks");

export async function listTopics(): Promise<Topic[]> {
  const raw = await fs.readFile(path.join(DATA_DIR, "topics.json"), "utf-8");
  return JSON.parse(raw);
}
