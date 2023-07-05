import { header } from "@/components/smallComponents/TextComponents";
import Card from "@/components/smallComponents/Card";
export default function Articles() {
  return (
    <div
      className="my-10 flex flex-col flex-nowrap justify-center items-center w-full"
      id="articles"
    >
      <div className="font-thin my-4">MOST POPULAR</div>
      <h2 className={header({ size: "h1", color: "primary" })}>ARTICLES</h2>
      <div className="flex flex-row flex-wrap w-full justify-center md:justify-between items-center my-8 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-400 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
        View more
      </button>
    </div>
  );
}
