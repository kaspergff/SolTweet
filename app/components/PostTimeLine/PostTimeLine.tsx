import { PublicKey } from "@solana/web3.js";
import { FC, Key } from "react";

import Avatar from "../Avatar/Avatar";
import LikeButton from "../LikeButton/LikeButton";

declare global {
  interface Post {
    userAddress: PublicKey;
    postDescription: string;
    likedBy: string[];
  }
}
interface PostTimeLineProps {
  posts: Post[];
}

export default function PostTimeLine(props: PostTimeLineProps) {
  return (
    <div className="flex flex-col">
      {props.posts.map(post => (
        <Post {...post} />
      ))}
    </div>
  );
}

const Post: FC<Post> = ({ userAddress, postDescription, likedBy }) => {
  return (
    <div className="mx-auto shadow w-full md:w-3/5 border-1 rounded-md flex flex-row items-center h-full space-x-5 p-2 m-2">
      <div className="w-12 bg-purple-300 h-12 rounded-full justify-self-start">
        <Avatar seed={userAddress.toString()} />
      </div>
      <div className="justify-self-start grow flex flex-col space-y-3 ">
        <div className="p-1 bg-purple-600 max-w-fit bg-opacity-90 rounded-md text-white">
          {userAddress.toString()}
        </div>
        <div className="rounded-md  max-w-[29rem] break-words">
          {postDescription}
        </div>
      </div>
      <div>
        <LikeButton userAddress={userAddress.toString()} likedBy={likedBy} />
      </div>
    </div>
  );
};
