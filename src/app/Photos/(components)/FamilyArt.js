import { getData } from "@/lib/helpers/getData";
import Trabajo from "./Trabajo";
const QUERY = `
  query GetTrabajos($idUser: String!) {
    getTrabajos(idUser: $idUser) {
      _id
      url
      userId
      userName
      date
      status
    }
  }
`;
export default async function FamilyArt({ user }) {
  const data = await getData({
    query: QUERY,
    variables: { idUser: user.value },
  });
  const trabajos = data?.getTrabajos || [];
  return (
    <div className="mt-8 flex flex-col flex-nowrap">
      <h3 className="w-full text-center">Trabajos de {user.label}</h3>
      <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-between items-center mt-4 w-full">
        {trabajos.map((trabajo) => (
          <Trabajo key={trabajo._id} trabajo={trabajo} />
        ))}
      </div>
    </div>
  );
}
