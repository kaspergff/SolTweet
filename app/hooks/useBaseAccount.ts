// keypair
import kp from "../lib/keypair.json";
import { web3 } from "@project-serum/anchor";

// Create a keypair for the account that will hold the Post data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

export default () => baseAccount