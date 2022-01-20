import { useEffect, useState } from "react";

import { web3, } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";

// lib
import getProvider from "../lib/getProvider";
import getProgram from "../lib/getProgram";
import createBaseAccount from "../lib/createBaseAccount";

// components
import NavBar from "../components/NavBar/NavBar";
import PostForm from "../components/PostForm/PostForm";
import PostTimeLine from "../components/PostTimeLine/PostTimeLine";

// keypair
import kp from "../lib/keypair.json";


// Create a keypair for the account that will hold the Post data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// Controls how we want to acknowledge when a transaction is "done".

declare global {
  interface Window {
    solana: any;
  }
}

const App = () => {
  // State
  const [postList, setPostList] = useState<Post[]>([]);

  const { publicKey, sendTransaction } = useWallet();


  // function to fetch the posts from the blockchain
  const getPostList = async () => {
    const program = getProgram();
    try {
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      let list: Post[] = account.postList as Post[];
      console.log("Got the account", account.postList);
      setPostList(list);
    } catch (error) {
      console.log("Error in setPostList: ", error);
      setPostList([]);
    }
  };

  const sendPost = async (postDescription: string) => {
    const provider = getProvider();
    const program = getProgram();
    if (postDescription.length === 0) {
      console.log("No post description given!");
      return;
    }
    console.log("post description:", postDescription);
    try {
      await program.rpc.addPost(postDescription, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("Post successfully sent to program", postDescription);

      await getPostList();
    } catch (error) {
      console.log("Error sending Post:", error);
    }
  };

  const renderPostTimeLine = () => {
    if (postList.length === 0) {
      console.log("initialize baseAccount");
      return (
        // means the base account is not yet initialized
        <div>
          <p>Erro</p>
          <button onClick={createBaseAccount}>
            Do One-Time Initialization For post Program Account
          </button>
        </div>
      );
    }
    // Otherwise, we're good! Account exists. User can submit GIFs.
    else {
      console.log("renderPostTimeLine", postList, postList.length);
      return <PostTimeLine posts={postList} />;
    }
  };

  // checks if user is connected with a wallet
  useEffect(() => {
    if (publicKey) {
      console.log("Fetching Posts");
      getPostList();
    }
  }, [publicKey]);

  return (
    <div className="flex flex-col  min-h-screen dark:bg-zinc-800">
      <NavBar />
      <main className="flex flex-col p-4">
        {publicKey && (
          <PostForm {...{ address: publicKey.toString(), sendPost: sendPost }} />
        )}

        {publicKey && renderPostTimeLine()}
      </main>
    </div>
  );
};

export default App;
