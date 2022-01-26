import useBaseAccount from "@/hooks/useBaseAccount";
import { PublicKey } from "@solana/web3.js";
import getProgram from "./getProgram";

// function to fetch the posts from the blockchain
const getPostList = async () => {
  const baseAccount = useBaseAccount();
  const program = getProgram();
  try {
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    let list: Post[] = account.postList as Post[];
    return list;
  } catch (error) {
    console.log("Error in setPostList: ", error);
    return [];
  }
};

export const getPostByAddress = async (address: PublicKey) => {
  const allPosts = await getPostList();
  const filterdList = allPosts.filter(post => post.userAddress.toString() == address.toString());
  return filterdList;
};

export default getPostList;
