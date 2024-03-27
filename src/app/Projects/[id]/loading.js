import FakeMockUp from "@/components/atoms/FakeMockup";

export default function loading() {
  return (
    <div className="flex flex-col flex-nowrap h-screen w-screen justify-center items-center gap-8">
      <div className="w-24 p-4 bg-zinc-400" />
      <div className="w-36 p-4 bg-zinc-400" />
      <div className="flex flex-row flex-wrap gap-4">
        <FakeMockUp />
        <FakeMockUp />
        <FakeMockUp />
      </div>
      <div className="w-36 h-96 p-4 bg-zinc-400" />
    </div>
  );
}
