import Image from "next/image";
import { useState } from "react";
import Avatar from "../Avatar/Avatar";

//types
interface Props {
  address: string;
  sendPost: (postDescription: string) => Promise<void>;
}

export default function PostForm(props: Props) {
  const [postText, setPostText] = useState("");

  const onInputChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setPostText(value);
  };

  return (
    <form
      className="container w-full md:w-3/5 mx-auto shadow "
      onSubmit={event => {
        event.preventDefault();
        props.sendPost(postText);
      }}>
      <div className="p-4 bg-gray-100 dark:bg-zinc-800 border-t-2 dark:border-purple-600 rounded-lg bg-opacity-5">
        <div className=" mx-auto md:w-full md:mx-0">
          <div className="flex flex-row items-center ">
            <div className="w-12 bg-purple-300 h-12 rounded-full">
              <Avatar seed={props.address} />
            </div>
            <p className="pl-2">Your addres: {props.address}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6 bg-white dark:bg-zinc-800">
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <label className="text-gray-700" htmlFor="name">
            <textarea
              className="flex-1 appearance-none border dark:placeholder-gray-200 dark:bg-zinc-800 border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter your post"
              rows={5}
              cols={100}
              value={postText}
              onChange={onInputChange}></textarea>
          </label>
        </div>
        <div className="w-full px-4 pb-4 ml-auto  text-gray-500 md:w-1/3">
          <button
            type="submit"
            className="py-2 px-4  bg-purple-600 hover:bg-purple-800 focus:ring-purple-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
