"use client";
import { useState } from "react";
import Input from "@/components/smallComponents/Input";
import TextArea from "@/components/smallComponents/TextArea";
import { button } from "@/components/smallComponents/ButtonComponents";
import { postData } from "@/lib/helpers/getData";
import Alert from "@/components/smallComponents/Alert";
const MUTATION = `
  mutation Mutation($addActivityId: ID!, $activity: ActivityInput!) {
    addActivity(id: $addActivityId, activity: $activity) {
      code
      data
      message
      success
    }
  }
`;
export default function AddActivity({ setRefetch, id }) {
  const initial = {
    dateStarted: new Date(),
    dateEnded: new Date(),
    position: "",
    activity: "",
    activityDetail: "",
  };
  const [activity, setActivity] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const variables = {
      addActivityId: id,
      activity,
    };
    setError("");
    try {
      const save = await postData({
        query: MUTATION,
        variables,
      });
      setLoading(false);
      console.log(save);
      if (save.addActivity.success) {
        setActivity(initial);
        setRefetch(true);
        return;
      }
      if (!save.addActivity.success) {
        setError(save.addActivity);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <h3 className="my-4">Agregar actividad</h3>
      <form
        className="mt-4 flex flex-row flex-wrap w-full gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          type="date"
          name="dateStarted"
          values={activity}
          setValues={setActivity}
        />
        <Input
          type="date"
          name="dateEnded"
          values={activity}
          setValues={setActivity}
        />
        <Input
          type="text"
          name="position"
          values={activity}
          setValues={setActivity}
        />
        <Input
          type="text"
          name="activity"
          values={activity}
          setValues={setActivity}
        />
        <TextArea
          name="activityDetail"
          values={activity}
          setValues={setActivity}
          width="w-full"
        />
        <button
          className={`${button({ color: "primary" })}`}
          disabled={loading}
        >
          Agregar
        </button>
      </form>
      {error && <Alert color="red" type="Error" description={error} />}
    </>
  );
}
