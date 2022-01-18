import getProvider from "./getProvider";
import getProgram from "./getProgram";

// keypair
import kp from "../lib/keypair.json";
import { web3 } from "@project-serum/anchor";

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

// Create a keypair for the account that will hold the Post data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// function to initialize the baseaccount
// base account is initialize so its not needed anymore
const createBaseAccount = async () => {
  const provider = getProvider();
  const program = getProgram();
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
    // await getPostList();
  } catch (error) {
    console.log("Error creating BaseAccount account:", error);
  }
};

export default createBaseAccount;
