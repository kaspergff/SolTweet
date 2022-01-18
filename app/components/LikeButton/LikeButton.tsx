import likePost from "../../lib/likePost";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  userAddress: string;
  postDescription: string;
  likedBy: any[];
}

export default function LikeButton(props: LikeButtonProps) {
  const [liked, setliked] = useState(false);

  const check = () => {
    const likedByToString = props.likedBy.map(item => item.toString());
    const bool = likedByToString.includes(props.userAddress);
    setliked(bool);
  };
  const onClick = async () => {
    const likeProps = {
      description: props.postDescription,
      author: props.userAddress,
    };
    if (!liked) {
      await likePost(likeProps);
      check();
    }
  };

  useEffect(() => {
    check();
  }, [liked]);

  const fullHeart = () => (
      <button className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fillRule="evenodd"
          className=" fill-purple-600"
          viewBox="0 0 16 16">
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
        {props.likedBy.length}
      </button>
  );

  const emptyHeart = () => (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="fill-purple-600"
        viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
      </svg>
      {props.likedBy.length}
    </button>
  );

  return (
    <>
      {liked && fullHeart()}
      {!liked && emptyHeart()}
    </>
  );
}
