import { getServerSession } from "next-auth";
import { authOptions } from "@/utlis/authOptions";
import { redirect } from "next/navigation";
export default async function layout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  return (
    <main className="flex flex-col flex-nowrap w-full justify-center items-center">
      <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
        <div className="flex flex-col flex-nowrap w-full justify-start items-start">
          {children}
        </div>
      </div>
    </main>
  );
}
