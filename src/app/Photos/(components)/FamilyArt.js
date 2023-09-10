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
    <div className="mt-8 flex flex-col flex-nowrap w-full">
      <h3 className="w-full text-center my-8">Trabajos de {user.label}</h3>
      <div className="flex flex-row flex-wrap  justify-center gap-4 items-center w-full ">
        {trabajos.map((trabajo) => (
          <Trabajo key={trabajo._id} trabajo={trabajo} />
        ))}
      </div>
    </div>
  );
}
