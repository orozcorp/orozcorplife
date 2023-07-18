"use client";

import { getData, postData } from "@/lib/helpers/getData";
import { useState, useEffect } from "react";
import { button, pill } from "@/components/smallComponents/ButtonComponents";
import { header } from "@/components/smallComponents/TextComponents";
import Mockup from "@/components/smallComponents/Mockup";
import Alert from "@/components/smallComponents/Alert";
const QUERY = `
  query GetPortfolioById($getPortfolioByIdId: ID!) {
    getPortfolioById(id: $getPortfolioByIdId) {
      _id
      active
      company
      date
      description
      images
      project
    }
  }
`;

const MUTATION_DELETE_IMG = `
  mutation UpdatePortfolioImage($updatePortfolioImageId: ID!, $image: String!, $action: String!) {
    updatePortfolioImage(id: $updatePortfolioImageId, image: $image, action: $action) {
      code
      message
      data
      success
    }
  }
`;

export default function PortfolioSingle({ params }) {
  const { id } = params;
  const [refetch, setRefetch] = useState(true);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (!refetch) return;
      if (project?._id === id) return;
      try {
        const query = await getData({
          query: QUERY,
          variables: { getPortfolioByIdId: id },
        });
        setProject(query?.getPortfolioById);
        setRefetch(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refetch, id, project]);
  const handleDelete = async (img) => {
    setLoading(true);
    try {
      const mutation = await postData({
        query: MUTATION_DELETE_IMG,
        variables: {
          updatePortfolioImageId: id,
          image: img,
          action: "delete",
        },
      });
      setLoading(false);
      if (mutation.updatePortfolioImage.success) {
        setRefetch(true);
      }
      if (!mutation.updatePortfolioImage.success) {
        setError(error.message);
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  return (
    <>
      <h1 className={`${header({ size: "h1", color: "primary" })}`}>
        {project?.company}
      </h1>
      <h2 className={`${header({ size: "h2", color: "primary" })} my-4`}>
        {project?.project}
      </h2>
      <p className="whitespace-pre-line">{project?.description}</p>
      <div className="flex flex-row flex-wrap w-full justify-between items-stretch mt-8">
        {project?.images?.map((img, i) => (
          <div
            key={i}
            className="hover:bg-sky-200 p-4 rounded flex flex-col flex-nowrap justify-center items-cente hover:shadow-lg hover:drop-shadow-2xl hover:shadow-2xl"
          >
            <button
              className={`${button({ color: "danger", fontSize: "small" })}`}
              onClick={() => handleDelete(img)}
              disabled={loading}
            >
              delete
            </button>
            <Mockup img={img} title={i} />
            {error && <Alert color="red" type="Error" description={error} />}
          </div>
        ))}
      </div>
    </>
  );
}
