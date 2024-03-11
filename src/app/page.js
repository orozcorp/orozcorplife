// const Hero = dynamic(() => import("./(Home)/Hero/page"));
import Articles from "./(Home)/Articles/page";
import Portfolio from "./(Home)/Portfolio/page";
import Resume from "./(Home)/Resume/page";
import Contact from "./(Home)/Contact/page";

export default function Home() {
  return (
    <main className="flex flex-col flex-nowrap w-full justify-center items-center">
      {/* <Hero /> */}
      <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
        <div className="flex flex-col flex-nowrap w-full justify-start">
          <Resume />
          <Portfolio />
          <Contact />
          <Articles />
        </div>
      </div>
    </main>
  );
}
