import Link from "next/link";
export default function Footer() {
  return (
    <div className="bg-zinc-800 flex flex-row items-start justify-between py-8 px-16 text-white">
      <div>Eduardo Orozco Mendoza</div>
      <Link href="https://github.com/orozcorp"> Github</Link>
    </div>
  );
}
