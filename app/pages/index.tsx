import { useEffect, useState } from "react";

import { Program, Provider, web3, Idl } from "@project-serum/anchor";

// hooks
import getProvider from "../lib/getProvider";
import getProgram from "../lib/getProgram";

// components
import NavBar from "../components/NavBar/NavBar";
import PostForm from "../components/PostForm/PostForm";
import PostTimeLine from "../components/PostTimeLine/PostTimeLine";

// keypair
import kp from "../lib/keypair.json";


// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

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
  const [walletAddress, setWalletAddress] = useState("");
  const [postList, setPostList] = useState<Post[]>([]);
  const [inputValue, setInputValue] = useState("");

  // function to initialize the baseaccount
  // base account is initialize so its not needed anymore
  const createPostAccount = async () => {
    const provider = getProvider();
    const program = getProgram()
    try {
      console.log("ping");
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "Created a new BaseAccount w/ address:",
        baseAccount.publicKey.toString()
      );
      await getPostList();
    } catch (error) {
      console.log("Error creating BaseAccount account:", error);
    }
  };

  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */
  const checkIfWalletIsConnected = async (onlyIfTrusted: Boolean) => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          /*
           * The solana object gives us a function that will allow us to connect
           * directly with the user's wallet!
           */
          const response = await solana.connect({
            onlyIfTrusted: onlyIfTrusted,
          });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // function that connects / disconnects wallet
  const setWalletConnection = async () => {
    if (walletAddress === "") {
      // means wallet is not connected
      checkIfWalletIsConnected(false);
    } else {
      // means wallet is connected
      const { solana } = window;
      solana.disconnect();
      solana.on("disconnect", () => console.log("Disconnected!"));
      setWalletAddress("");
    }
  };

  // function to fetch the posts from the blockchain
  const getPostList = async () => {
    const program = getProgram()
    try {
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      let list:Post[] = account.postList as Post[]
      console.log("Got the account", account.postList);
      setPostList(list);

    } catch (error) {
      console.log("Error in setPostList: ", error);
      setPostList([]);
    }
  };

  const sendPost = async (postDescription: string) => {
    const provider = getProvider();
    const program = getProgram()
    if (postDescription.length === 0) {
      console.log("No post description given!");
      return;
    }
    setInputValue("");
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
    if (postList === null) {
      return (
        <div>
          <p>Erro</p>
          <button onClick={createPostAccount}>
            Do One-Time Initialization For post Program Account
          </button>
        </div>
      );
    }
    // Otherwise, we're good! Account exists. User can submit GIFs.
    else {
      console.log("renderPostTimeLine" ,postList, postList.length);

      
      return <PostTimeLine posts={postList} />;
    }
  };

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected(true);
    };
    onLoad();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching Posts");
      getPostList();
    }
  }, [walletAddress]);

  return (
    <div className="flex flex-col  min-h-screen dark:bg-zinc-800">
      <NavBar
        {...{
          connectWallet: setWalletConnection,
          walletAddress: walletAddress,
        }}
      />
      <main className="flex flex-col p-4">
        {walletAddress && (
          <PostForm {...{ address: walletAddress, sendPost: sendPost }} />
        )}

        {walletAddress && renderPostTimeLine()}
      </main>
    </div>
  );
};

export default App;
