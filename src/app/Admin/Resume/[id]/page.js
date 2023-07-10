"use client";
import { button, pill } from "@/components/smallComponents/ButtonComponents";
import { header } from "@/components/smallComponents/TextComponents";
import { format_date } from "@/lib/helpers/formatters";
import { getData } from "@/lib/helpers/getData";
import AddActivity from "./AddActivity";
import { useState, useEffect } from "react";
import SingleActivity from "./SingleActivity";
const QUERY = `
  query GetResumeById($getResumeByIdId: ID!) {
    getResumeById(id: $getResumeByIdId) {
      _id
      active
      activity {
        activity
        activityDetail
        dateEnded
        dateStarted
        position
      }
      company
      dateEnded
      dateStarted
    }
  }
`;

export default function ResumeSingle({ params }) {
  const { id } = params;
  const [refetch, setRefetch] = useState(true);
  const [resume, setResume] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (!refetch) return;
      if (resume?._id === id) return;
      try {
        const query = await getData({
          query: QUERY,
          variables: { getResumeByIdId: id },
        });
        setResume(query?.getResumeById);
        setRefetch(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refetch, resume, id]);
  return (
    <>
      <h1 className={`${header({ size: "h1", color: "primary" })}`}>
        {resume?.company}
      </h1>
      <div className="flex flex-row flex-wrap justify-between items-center gap-8">
        <button
          className={`${button({
            color: resume?.activity ? "primary" : "danger",
            fontSize: "medium",
          })} my-4`}
        >
          {resume?.activity ? "Online" : "Offline"}
        </button>
        <div className={`${pill({ color: "primary" })}`}>
          {format_date(resume.dateStarted)}
        </div>
        <div className={`${pill({ color: "primary" })}`}>
          {format_date(resume.dateEnded)}
        </div>
      </div>
      <h2 className={`${header({ size: "h2", color: "primary" })} mt-8`}>
        Actividades
      </h2>
      <AddActivity setRefetch={setRefetch} id={id} />
      <div className="flex flex-col flex-nowrap gap-4">
        {resume?.activity?.map((activity, index) => (
          <SingleActivity key={index} activity={activity} />
        ))}
      </div>
    </>
  );
}
