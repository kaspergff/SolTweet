import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import ProfileLink from "../ProfileLink/ProfileLink";

interface AvatarProps {
  seed: PublicKey;
  size: string;
}

const Avatar = (props: AvatarProps) => {
  return (
    // <ProfileLink address={props.seed}>
      <Image
      className="cursor-pointer"
        width={props.size}
        height={props.size}
        src={
          "https://avatars.dicebear.com/api/bottts/" +
          props.seed.toString() +
          ".svg"
        }></Image>
    // </ProfileLink>
  );
};

export default Avatar;
