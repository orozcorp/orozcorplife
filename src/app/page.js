import dynamic from "next/dynamic";
const Hero = dynamic(() => import("./(Home)/Hero/page"));
const Articles = dynamic(() => import("./(Home)/Articles/page"));
const Portfolio = dynamic(() => import("./(Home)/Portfolio/page"));
const Resume = dynamic(() => import("./(Home)/Resume/page"));
const Contact = dynamic(() => import("./(Home)/Contact/page"));
export default function Home() {
  return (
    <main className="flex flex-col flex-nowrap w-full justify-center items-center">
      <Hero />
      <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
        <div className="flex flex-col flex-nowrap w-full justify-start">
          {/* <Articles /> */}
          <Portfolio />
          <Resume />
          <Contact />
        </div>
      </div>
    </main>
  );
}
