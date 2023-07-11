import Link from "next/link";
export default function NavbarDisplayed({ showMenu, setShowMenu, session }) {
  return (
    <div className="h-screen bg-zinc-800">
      <div
        className="m-3 mt-7 flex flex-col flex-nowrap justify-start content-center items-center"
        onClick={() => setShowMenu(false)}
      >
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
        {session && (
          <>
            <div className="mt-3 text-white text-3xl">
              <Link href="/Admin/Articles">Articles</Link>
            </div>
            <div className="mt-3 text-white text-3xl">
              <Link href="/Admin/Portfolio">Portfolio</Link>
            </div>
            <div className="mt-3 text-white text-3xl">
              <Link href="/Admin/Resume">Resume</Link>
            </div>
            <div className="mt-3 text-white text-3xl">
              <Link href="/Admin/Contact">Contact</Link>
            </div>
            <button
              className="mt-3 text-white text-3xl"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
