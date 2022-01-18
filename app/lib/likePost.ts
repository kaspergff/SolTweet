import useBaseAccount from "@/hooks/useBaseAccount";

import getProgram from "./getProgram";
import getProvider from "./getProvider";

interface likePostProps{
  description:string;
  author:string;
}

const likePost = async (props:likePostProps) => {

    try {
      const program = getProgram()

      await program.rpc.likePost(props.description, props.author, {
        accounts: {
          baseAccount: useBaseAccount().publicKey,
          user: getProvider().wallet.publicKey,
        },
      });
      console.log("Post successfully liked");

    } catch (error) {
      console.log("Error liking Post:", error);
    }
  };

export default likePost;
