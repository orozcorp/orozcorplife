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
  const [resume, setResume] = useState([]);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!refetch) return;
      try {
        const query = await getData({
          query: QUERY,
        });
        setResume(query?.getResume);
        setRefetch(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refetch, resume]);
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
