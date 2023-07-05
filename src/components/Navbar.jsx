"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useWindowSize from "./hooks/useWindowSize";
import NavbarDisplayed from "./NavbarDisplayed";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const size = useWindowSize();
  const width = size?.width ?? 0;
  const [showMenu, setShowMenu] = useState(false);
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="flex flex-row items-center justify-center bg-white shadow-lg shadow-zinc-600">
        <div className="w-11/12 flex flex-row items-center h-16 justify-between bg-opacity-0">
          <div className="flex justify-between items-center content-center bg-opacity-0">
            <div className="flex bg-opacity-0">
              <div className="ml-6 flex space-x-8 bg-opacity-0">
                <Link href="/">
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    <Image
                      src="https://s3.amazonaws.com/stgfinal/mensajes/BFKQuMxLcF5HDxb9v/1616334156061-790BDD13-A03A-4EF4-94E8-DB239ECC2AEC.jpeg"
                      width={50}
                      height={50}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                      alt="Orozcorp"
                    />
                    <div className="text-zinc-700 text-2xl">Eduardo Orozco</div>{" "}
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {width > 1000 && (
            <div className="flex justify-between items-center content-center mr-4">
              <div className="flex">
                <div className="ml-6 flex space-x-8 text-zinc-700">
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
                      <Link href="/Admin/Articles">Edit Articles</Link>
                      <Link href="/Admin/Portfolio">Edit Portfolio</Link>
                      <Link href="/Admin/Resume">Edit Resume</Link>
                      <Link href="/Admin/Contact">Get Contact</Link>
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
                      color: "rgb(63 63 70)",
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
