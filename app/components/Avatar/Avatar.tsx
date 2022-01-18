import Image from "next/image";

interface AvatarProps {
  seed: string;
}

const Avatar = (props: AvatarProps) => {
  return (
    <Image
      width="48px"
      height="48px"
      src={"https://avatars.dicebear.com/api/bottts/" + props.seed + ".svg"}></Image>
  );
};

export default Avatar;

