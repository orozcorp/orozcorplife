import Mockup from "@/components/smallComponents/Mockup";
import { header } from "@/components/smallComponents/TextComponents";
import { getData } from "@/lib/helpers/getData";

const QUERY = `
  query GetPortfolios {
    getPortfolios {
      _id
      company
      images
      project
      description
      date
    }
  }
`;

export default async function Portfolio() {
  const data = await getData({ query: QUERY });
  const portfolios = data?.getPortfolios || [];
  return (
    <div
      className="my-10 flex flex-col flex-nowrap justify-center items-center max-w-[100vw] "
      id="portfolio"
    >
      <div className="font-thin my-4">MOST RECENT</div>
      <h2 className={`${header({ size: "h1", color: "primary" })} `}>
        PROJECTS
      </h2>
      <div className="w-screen">
        <div className="w-screen overflow-x-scroll flex flex-row flex-nowrap justify-center px-6 my-6 h-screen">
          <div
            className="overflow-x-scroll flex gap-20 h-full justify-start items-center"
            style={{ scrollBehavior: "smooth" }}
          >
            {portfolios?.map((portfolio) => (
              <Mockup
                key={portfolio?._id}
                img={portfolio?.images[0]}
                title={portfolio?.project}
                description={portfolio?.company}
                link={`/Projects/${portfolio?._id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
