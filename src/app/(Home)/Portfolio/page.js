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
  const portfolios = data?.getPortfolios;
  return (
    <div
      className="my-10 flex flex-col flex-nowrap justify-center items-center w-full"
      id="portfolio"
    >
      <div className="font-thin my-4">MOST RECENT</div>
      <h2 className={`${header({ size: "h1", color: "primary" })} mb-8`}>
        PROJECTS
      </h2>
      <div className="w-screen">
        <div className="w-full overflow-scroll flex flex-row flex-nowrap justify-center gap-8 mx-8">
          <div
            className="overflow-x-scroll flex gap-8 mx-8"
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
      {/* <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-400 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
        View more
      </button> */}
    </div>
  );
}
