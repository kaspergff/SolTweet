import Avatar from "@/components/Avatar/Avatar";
import NavBar from "@/components/NavBar/NavBar";
import PostTimeLine from "@/components/PostTimeLine/PostTimeLine";
import { getPostByAddress } from "@/lib/getPosts";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default () => {
  // State
  const [walletAddress, setWalletAddress] = useState("");
  const [posts, setPosts] = useState([] as Post[]);

  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    const setAddress = async () => {
      if (address) {
        setWalletAddress(address as string);
      }
    };
    setAddress();
  }, [address]);

  useEffect(() => {
    const getPost = async () => {
      if (walletAddress) {
        const _posts = await getPostByAddress(new PublicKey(walletAddress));
        setPosts(_posts);
      }
    };
    getPost();
  }, [walletAddress]);

  return (
    <div className="flex flex-col  min-h-screen dark:bg-zinc-800">
      <NavBar />
      <div className="dark:bg-zinc-800  border-t-1 rounded-lg  my-5 flex flex-col min-w-0 break-words w-full  ">
        <div className="px-6 p-2 border-1 shadow rounded-md">
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
              {/* <div className="py-6 px-3 mt-32 sm:mt-0">
                  <button
                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}>
                    Connect
                  </button>
                </div> */}
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <p className="text-xl font-bold block uppercase tracking-wide ">
                    {posts.length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Posts
                  </p>
                </div>
                <div className="mr-4 p-3 text-center">
                  <p className="text-xl font-bold block uppercase tracking-wide ">
                  {posts.map(post => post.likedBy.length).reduce((tot,num) =>tot+num,0)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Likes
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 dark:text-white">
              {walletAddress}
            </h3>
            {/* <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 dark:text-gray-200 font-bold uppercase">
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
              </div> */}
          </div>
          <div className="mt-10 border-t border-gray-300  ">
            <div className="flex flex-wrap mt-5 justify-center">
              <div className="w-full  ">
              <PostTimeLine posts={posts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
