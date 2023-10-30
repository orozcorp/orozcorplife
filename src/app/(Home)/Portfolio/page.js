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
      className="my-10 flex flex-col flex-nowrap justify-center items-center w-full "
      id="portfolio"
    >
      <div className="font-thin my-4">MOST RECENT</div>
      <h2 className={`${header({ size: "h1", color: "primary" })} mb-8`}>
        PROJECTS
      </h2>
      <div className="w-screen">
        <div className="w-full overflow-x-scroll flex flex-row flex-nowrap justify-center mx-14 my-20 h-screen">
          <div
            className="overflow-x-scroll flex gap-20 h-full "
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
