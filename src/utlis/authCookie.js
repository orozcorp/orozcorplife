import { cookies } from "next/headers";
import Cookies from "js-cookie";
import { connectToDatabase } from "@/lib/mongodb";
const dev = process.env.NODE_ENV !== "production";

export default async function getContext() {
  const secret = process.browser
    ? Cookies.get(
        dev ? "next-auth.session-token" : "__Secure-next-auth.session-token"
      )
    : cookies().get(
        dev ? "next-auth.session-token" : "__Secure-next-auth.session-token"
      )?.value;
  const { db } = await connectToDatabase();
  const userId = await db
    .collection("sessions")
    .findOne({ sessionToken: secret }, { projection: { userId: 1 } });
  return {
    usuario: userId?.userId.toString() || null,
  };
}
