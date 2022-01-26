import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { useTheme } from "next-themes";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export default function NavBar() {
  return (
    <nav className="bg-white dark:bg-zinc-800  shadow ">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className=" flex items-center">
            <a className="flex-shrink-0" href="/">
              <h1 className="text-xl font-semibold text-purple-700">SolTweet</h1>
            </a>
            {/* <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    className="text-gray-300  hover:text-zinc-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#">
                    Home
                  </a>
                  <a
                    className="text-zinc-800 dark:text-white  hover:text-zinc-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#">
                    Gallery
                  </a>
                  <a
                    className="text-gray-300  hover:text-zinc-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#">
                    Content
                  </a>
                  <a
                    className="text-gray-300  hover:text-zinc-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#">
                    Contact
                  </a>
                </div>
              </div> */}
          </div>
          <div className="ml-4 flex flex-row items-center md:ml-6">
            <ThemeToggler />
            <WalletMultiButton className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" />
          </div>
          {/* <div className="-mr-2 flex md:hidden">
              <button className="text-zinc-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div> */}
        </div>
      </div>
      {/* <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              className="text-gray-300 hover:text-zinc-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#">
              Home
            </a>
            <a
              className="text-zinc-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#">
              Gallery
            </a>
            <a
              className="text-gray-300 hover:text-zinc-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#">
              Content
            </a>
            <a
              className="text-gray-300 hover:text-zinc-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#">
              Contact
            </a>
          </div>
        </div> */}
    </nav>
  );
}
