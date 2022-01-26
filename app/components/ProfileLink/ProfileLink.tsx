import { PublicKey } from "@solana/web3.js";
import Link from "next/link";

interface Props {
  address: PublicKey;
  children: any;
}

export default ({ address, children }: Props) => {
  const _address = address.toString();

  return <Link href={`/address/${_address}`}>{children}</Link>;
};
