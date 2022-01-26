import { formatAddress } from "@/lib/utils";
import { PublicKey } from "@solana/web3.js";
import { FC } from "react";

import Avatar from "../Avatar/Avatar";
import LikeButton from "../LikeButton/LikeButton";
import ProfileLink from "../ProfileLink/ProfileLink";
import TipAuthorButton from "../TipAuthorButton/TipAuthorButton";

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


// reverse array is not optimal -> improve in smart contract
export default function PostTimeLine(props: PostTimeLineProps) {
  return (
    <div className="flex flex-col">
      {props.posts.map((post, index) => (
        <Post {...post} key={index} />
      )).reverse()}
    </div>
  );
}

const Post: FC<Post> = ({ userAddress, postDescription, likedBy }) => {
  return (
    <div className="mx-auto  shadow w-full md:w-4/5 lg:w-3/5 border-1 rounded-md flex flex-row items-center h-full space-x-5 p-2 m-2">
      <div className="w-12 bg-purple-300 h-12 rounded-full justify-self-start">
        {/* <ProfileLink address={userAddress}> */}
          <Avatar size="48px" seed={userAddress} />
        {/* </ProfileLink> */}
      </div>
      <div className="justify-self-start grow flex flex-col space-y-3 ">
        <p className="p-1 hidden md:block bg-purple-600 max-w-fit bg-opacity-90 rounded-md text-white">
          <ProfileLink address={userAddress}>
            {userAddress.toString()}
          </ProfileLink>
        </p>

        <p className="p-1 md:hidden bg-purple-600 max-w-fit bg-opacity-90 rounded-md text-white">
          <ProfileLink address={userAddress}>
            {formatAddress(userAddress.toString())}
          </ProfileLink>
        </p>
        <div className="rounded-md max-w-[29rem] break-words">
          {postDescription}
        </div>
      </div>
      <div className="flex flex-row items-start gap-3">
        <TipAuthorButton
          userAddress={userAddress}
          postDescription={postDescription}
          likedBy={likedBy}
        />
        <LikeButton
          postDescription={postDescription}
          userAddress={userAddress.toString()}
          likedBy={likedBy}
        />
      </div>
    </div>
  );
};
