import Avatar from "@/components/Avatar/Avatar";
import NavBar from "@/components/NavBar/NavBar";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default () => {
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    const foo = async () => {
      if (address) {
        console.log("adddresss  ", address);

        const add = address as string;
        setWalletAddress(add);
      }
    };
    foo();
  }, [address]);

  return (
    <div>
      <NavBar />
      <main className="">
        <div className="dark:bg-zinc-800 py-10 relative flex flex-col min-w-0 break-words  w-full shadow-xl ">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div className="relative">
                  {walletAddress && (
                    <div className="bg-purple-300 rounded-full">
                      <Avatar
                        size={"150px"}
                        seed={new PublicKey(walletAddress)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                <div className="py-6 px-3 mt-32 sm:mt-0">
                  <button
                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}>
                    Connect
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <p className="text-xl font-bold block uppercase tracking-wide ">
                      22
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-200">
                      Friends
                    </p>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <p className="text-xl font-bold block uppercase tracking-wide ">
                      10
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-200">
                      Photos
                    </p>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <p className="text-xl font-bold block uppercase tracking-wide ">
                      89
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-200">
                      Comments
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 dark:text-white">
                {walletAddress}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 dark:text-gray-200 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500 dark:text-gray-200"></i>{" "}
                Los Angeles, California
              </div>
              <div className="mb-2  mt-10">
                <i className="fas fa-briefcase mr-2 text-lg text-gray-500 dark:text-gray-200"></i>
                Solution Manager - Creative Tim Officer
              </div>
              <div className="mb-2 ">
                <i className="fas fa-university mr-2 text-lg text-gray-500 dark:text-gray-200"></i>
                University of Computer Science
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-gray-300 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-gray-800 dark:text-white">
                    An artist of considerable range, Jenna the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                  </p>
                  <a
                    href="#pablo"
                    className="font-normal text-pink-500"
                    onClick={e => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
