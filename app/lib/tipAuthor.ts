import { PublicKey, SystemProgram } from "@solana/web3.js";
import getProgram from "./getProgram";
import getProvider from "./getProvider";

interface tipAuthorProps {
  amount: string;
  receiver: PublicKey
}

export default async function tipAuthor(props:tipAuthorProps) {
  try {
    const provider = getProvider();
    const program = getProgram()

    await program.rpc.tipAuthor(props.amount, {
      accounts: {
        // baseAccount: baseAccount.publicKey,
        from: provider.wallet.publicKey,
        to: props.receiver,
        systemProgram: SystemProgram.programId
      },
    });
    console.log("Post successfully tipped");

  } catch (error) {
    console.log("Error tipping Post:", error);
  }
};
