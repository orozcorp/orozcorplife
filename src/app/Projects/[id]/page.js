import { header } from "@/components/smallComponents/TextComponents";
import { getData } from "@/lib/helpers/getData";
import Carousel from "./Carousel";
import { format_date } from "@/lib/helpers/formatters";
const QUERY = `
  query GetPortfolioById($getPortfolioByIdId: ID!) {
    getPortfolioById(id: $getPortfolioByIdId) {
      _id
      active
      company
      date
      images
      description
      project
    }
  }
`;
export default async function Project({ params }) {
  const { id } = params;
  const query = await getData({
    query: QUERY,
    variables: { getPortfolioByIdId: id },
  });
  const portfolio = query?.getPortfolioById;
  return (
    <div className="flex flex-col flex-nowrap w-full mt-8">
      <h1 className={`${header({ size: "h1", color: "primary" })}`}>
        Project: {portfolio?.project}
      </h1>
      <h2 className={`${header({ size: "h2", color: "secondary" })} my-8`}>
        Company: {portfolio?.company}{" "}
        <small className="ml-8 text-rose-800">
          {format_date(portfolio?.date)}
        </small>
      </h2>
      <div
        className="w-screen overflow-scroll flex flex-row flex-nowrap gap-8 "
        style={{ marginLeft: "-150px" }}
      >
        <Carousel images={portfolio?.images} title={portfolio?.project} />
      </div>
      <p className="my-20 whitespace-pre-line">{portfolio?.description}</p>
    </div>
  );
}
