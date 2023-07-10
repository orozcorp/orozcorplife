
import { header } from "@/components/smallComponents/TextComponents";
import { getData } from "@/lib/helpers/getData";
import Timeline from "@/components/smallComponents/Timeline";

const QUERY = `
  query GetResume {
    getResume {
      active
      company
      logo
      dateEnded
      dateStarted
      _id
      activity {
        activity
        activityDetail
        dateEnded
        dateStarted
        position
      }
    }
  }
`;

export default async function Resume() {
  const query = await getData({
          query: QUERY,
        });
  const resume = query?.getResume
  return (
    <div
      className="my-10 flex flex-col flex-nowrap justify-center items-center w-full"
      id="resume"
    >
      <h2 className={`${header({ size: "h1", color: "primary" })} mb-4`}>
        RESUME
      </h2>
      {resume?.map((resume) => (
        <Timeline key={resume._id} timeline={resume} />
      ))}
    </div>
  );
}
