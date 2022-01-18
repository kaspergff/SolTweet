import { useEffect } from "react";
//solana imports
import { Connection, clusterApiUrl, Commitment } from "@solana/web3.js";
import { Provider } from "@project-serum/anchor";

// Set our network to devnet.
const network = clusterApiUrl("devnet");

type Opts = {
  preflightCommitment: Commitment;
};

// Controls how we want to acknowledge when a transaction is "done".
const opts: Opts = {
  preflightCommitment: "processed",
};

// connection provider to solana
const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  let provider = new Provider(connection, window.solana, {
    commitment: opts.preflightCommitment,
  });

  return provider;
};

export default getProvider;
