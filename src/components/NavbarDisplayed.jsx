import Link from "next/link";
export default function NavbarDisplayed({ showMenu, setShowMenu, session }) {
  return (
    <div className="h-screen bg-zinc-800">
      <div className="m-3 mt-7 flex flex-col flex-nowrap justify-start content-center items-center">
        {!session && (
          <>
            <div className="mt-3 text-white text-3xl">
              <Link href="/#articles">Articles</Link>
            </div>
            <div className="mt-3 text-white text-3xl">
              <Link href="/#portfolio">Portfolio</Link>
            </div>
            <div className="mt-3 text-white text-3xl">
              <Link href="/#resume">Resume</Link>
            </div>
            <div className="mt-3 text-white text-3xl">
              <Link href="/#contact">Contact</Link>
            </div>
            <div className="mt-3 text-white text-3xl">
              <Link href="/api/auth/signin">Sign In</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
