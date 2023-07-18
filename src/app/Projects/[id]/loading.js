import Spinner from "@/components/smallComponents/Spinner";

export default function loading() {
  return (
    <div className="flex flex-col flex-nowrap h-screen w-screen justify-center items-center">
      <Spinner color="sky-800" />
    </div>
  );
}
