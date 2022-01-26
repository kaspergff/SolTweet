//solana imports
import {
  PublicKey,
} from "@solana/web3.js";
import { Program, Idl } from "@project-serum/anchor";

import getProvider from "./getProvider";

// idl
import idl from "../public/idl.json"

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

export default () => {
  const provider = getProvider()
  return new Program(idl as Idl, programID, provider);
};
