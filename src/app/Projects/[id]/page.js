import { header } from "@/components/smallComponents/TextComponents";
import Carousel from "./Carousel";
import { format_date } from "@/lib/helpers/formatters";
import Portfolio from "@/app/(Home)/Portfolio/page";
import { getPortfolioById } from "@/server/portfolio";
export default async function Project({ params }) {
  const { id } = params;
  const portfolio = await getPortfolioById({ id });
  return (
    <>
      <main className="flex flex-col flex-nowrap w-full justify-center items-center">
        <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
          <div className="flex flex-col flex-nowrap w-full justify-start items-start">
            <h1 className={`${header({ size: "h1", color: "primary" })}`}>
              Project: {portfolio?.project}
            </h1>
            <h2
              className={`${header({ size: "h2", color: "secondary" })} my-8`}
            >
              Company: {portfolio?.company}{" "}
              <small className="ml-8 text-rose-800">
                {format_date(portfolio?.date)}
              </small>
            </h2>
          </div>
        </div>
      </main>
      <div className="w-screen">
        <div className="w-full overflow-scroll flex flex-row flex-nowrap gap-8 ">
          <Carousel images={portfolio?.images} title={portfolio?.project} />
        </div>
      </div>
      <section className="flex flex-col flex-nowrap w-full justify-center items-center">
        <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
          <div className="flex flex-col flex-nowrap w-full justify-start items-start">
            <p className="my-20 whitespace-pre-line">
              {portfolio?.description}
            </p>
          </div>
        </div>
      </section>
      <Portfolio />
    </>
  );
}
