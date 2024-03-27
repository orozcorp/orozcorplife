import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
export default async function context() {
  const { db } = await connectToDatabase();
  const session = await getServerSession(authOptions);
  return { db, session };
}
