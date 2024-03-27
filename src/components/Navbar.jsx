"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useWindowSize from "./hooks/useWindowSize";
import NavbarDisplayed from "./NavbarDisplayed";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { rgbDataURL } from "@/lib/helpers/blur";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Navbar() {
  const size = useWindowSize();
  const width = size?.width ?? 0;
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="flex flex-row items-center justify-center darkBackground sticky top-0 z-50">
        <div className="w-11/12 flex flex-row items-center h-20 justify-between bg-opacity-0">
          <div className="flex justify-between items-center content-center bg-opacity-0">
            <div className="flex bg-opacity-0">
              <div className="ml-6 flex space-x-8 bg-opacity-0">
                <Link href="/" passHref>
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full">
                      <AspectRatio ratio={1}>
                        <Image
                          src="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
                          blurDataURL={rgbDataURL(0, 0, 0)}
                          loading="lazy"
                          className="object-cover rounded-full"
                          alt="Orozcorp"
                          fill
                        />
                      </AspectRatio>
                    </div>
                    <div className="text-white text-2xl">Eduardo Orozco</div>{" "}
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {width > 1000 && (
            <div className="flex justify-between items-center content-center mr-4">
              <div className="flex">
                <div className="ml-6 flex space-x-8 text-white">
                  {!session ? (
                    <>
                      <Link href="/#articles">Articles</Link>
                      <Link href="/#portfolio">Portfolio</Link>
                      <Link href="/#resume">Resume</Link>
                      <Link href="/#contact">Contact</Link>
                      <Link href="/api/auth/signin">Sign in</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/Photos">Photos</Link>
                      <div className="relative inline-block text-left">
                        <div>
                          <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex justify-center w-full rounded-md  text-sm font-medium text-white hover:bg-white hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-zinc-500"
                          >
                            Edit Info
                          </button>
                        </div>
                      </div>
                      <div
                        className={`origin-top-right absolute top-14 right-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                          isOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="py-1" role="menu">
                          <Link
                            href="/Admin/Articles"
                            onClick={() => setIsOpen(hidden)}
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Edit Articles
                          </Link>
                          <Link
                            onClick={() => setIsOpen(hidden)}
                            href="/Admin/Portfolio"
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Edit Portfolio
                          </Link>
                          <Link
                            onClick={() => setIsOpen(hidden)}
                            href="/Admin/Resume"
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Edit Resume
                          </Link>
                          <Link
                            onClick={() => setIsOpen(hidden)}
                            href="/Admin/Contact"
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Get Contact
                          </Link>
                        </div>
                      </div>
                      <button onClick={() => signOut()}>Sign out</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {width < 1000 && (
            <div className="flex justify-between items-center content-center mr-4">
              <div className="flex">
                <div className="ml-6 flex space-x-8">
                  <AiOutlineMenu
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#fff",
                    }}
                    onClick={() => setShowMenu(!showMenu)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {showMenu && (
        <NavbarDisplayed
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          session={session}
        />
      )}
    </>
  );
}
