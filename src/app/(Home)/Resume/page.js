import { header } from "@/components/smallComponents/TextComponents";
import Timeline from "@/components/smallComponents/Timeline";
export default function Resume() {
  return (
    <div className="my-10 flex flex-col flex-nowrap justify-center items-center w-full">
      <h2 className={`${header({ size: "h1", color: "primary" })} mb-4`}>
        RESUME
      </h2>
      <Timeline
        date="14th july 2023"
        activity={[
          {
            logo: "https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg",
            company: "company",
            position: "position",
            activity: "activity",
          },
        ]}
      />
      <Timeline
        date="14th july 2023"
        activity={[
          {
            logo: "https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg",
            company: "company",
            position: "position",
            activity: "activity",
          },
        ]}
      />
      <Timeline
        date="14th july 2023"
        activity={[
          {
            logo: "https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg",
            company: "company",
            position: "position",
            activity: "activity",
          },
        ]}
      />
    </div>
  );
}
