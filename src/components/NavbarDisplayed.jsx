import Link from "next/link";

export default function NavbarDisplayed({ showMenu, setShowMenu }) {
  return (
    <div className="h-screen bg-zinc-800">
      <div className="m-3 mt-7 flex flex-col flex-nowrap justify-start content-center items-center">
        <div className="mt-3 text-white text-3xl">
          <Link href="/">Articles</Link>
        </div>
        <div className="mt-3 text-white text-3xl">
          <Link href="/">Portfolio</Link>
        </div>
        <div className="mt-3 text-white text-3xl">
          <Link href="/">Resume</Link>
        </div>
        <div className="mt-3 text-white text-3xl">
          <Link href="/">Contact</Link>
        </div>
      </div>
    </div>
  );
}
