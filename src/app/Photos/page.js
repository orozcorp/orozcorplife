import { header } from "@/components/smallComponents/TextComponents";
import { getFamily } from "@/server/users";
import FamilyMember from "./(components)/FamilyMember";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utlis/authOptions";
export default async function Photos() {
  const session = await getServerSession(authOptions);
  const data = await getFamily({ id: session?.user?.id });
  const familyMembers =
    data?.map((val) => ({
      value: val._id,
      label: `${val.profile.name} ${val.profile.lastName}`,
    })) || [];
  return (
    <div>
      <h2 className={`${header({ size: "h1", color: "primary" })} mb-8`}>
        Trabajos escolares
      </h2>
      <FamilyMember familyMembers={familyMembers} />
    </div>
  );
}
