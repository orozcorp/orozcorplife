import Spinner from "@/components/smallComponents/Spinner";
export default function loading() {
  return (
    <div className="flex flex-column flex-nowrap w-full h-screen items-center justify-center">
      <Spinner color="sky-800" />
    </div>
  );
}
