import { pill } from "@/components/smallComponents/ButtonComponents";
import { format_date } from "@/lib/helpers/formatters";
export default function SingleActivity({ activity }) {
  return (
    <div className="my-4 border rounded">
      <div className="flex flex-row flex-wrap justify-between items-center gap-8 my-4">
        <div className={`${pill({ color: "primary" })}`}>
          {format_date(activity?.dateStarted)}
        </div>
        <div className={`${pill({ color: "primary" })}`}>
          {format_date(activity?.dateEnded)}
        </div>
      </div>
      <h1>{activity?.activity}</h1>
      <h2>{activity?.position}</h2>
      <p>{activity?.activityDetail}</p>
    </div>
  );
}
