import { connectToDatabase } from "../../src/lib/mongodb";
//! Context for Apollo Server

export async function context(ctx) {
  const { db } = await connectToDatabase();
  return { db };
}
