import Mockup from "@/components/smallComponents/Mockup";
import { header } from "@/components/smallComponents/TextComponents";
export default function Portfolio() {
  return (
    <div className="my-10 flex flex-col flex-nowrap justify-center items-center w-full">
      <div className="font-thin my-4">MOST RECENT</div>
      <h2 className={header({ size: "h1", color: "primary" })}>PROYECTS</h2>
      <div className="flex flex-row flex-wrap w-full justify-center md:justify-between items-center my-8 gap-4">
        <Mockup
          img="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
          title="test"
          description="test"
          link="test"
        />
        <Mockup
          img="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
          title="test"
          description="test"
          link="test"
        />
        <Mockup
          img="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
          title="test"
          description="test"
          link="test"
        />
        <Mockup
          img="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
          title="test"
          description="test"
          link="test"
        />
        <Mockup
          img="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
          title="test"
          description="test"
          link="test"
        />
        <Mockup
          img="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
          title="test"
          description="test"
          link="test"
        />
      </div>
      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-400 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
        View more
      </button>
    </div>
  );
}
