const QUERY = `
  query GetFamily($idUser: String!) {
    getFamily(idUser: $idUser) {
      _id
      createdAt
      profile {
        lastName
        name
      }
    }
  }
`;
import { header } from "@/components/smallComponents/TextComponents";
import { getData } from "@/lib/helpers/getData";
import FamilyMember from "./(components)/FamilyMember";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utlis/authOptions";
export default async function Photos() {
  const session = await getServerSession(authOptions);
  const data = await getData({
    query: QUERY,
    variables: { idUser: session?.user?.id },
  });
  const familyMembers =
    data?.getFamily?.map((val) => ({
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
