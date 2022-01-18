import tipAuthor from "@/lib/tipAuthor";
import { PublicKey } from "@solana/web3.js";
import { FC, useState } from "react";
import Avatar from "../Avatar/Avatar";

interface TipAuthorButtonProps {
  userAddress: PublicKey;
  postDescription: string;
  likedBy: any;
}

const TipAuthorButton = (props: TipAuthorButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [tipAmount, setTipAmount] = useState('')

  const onTipChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setTipAmount(value);
  };

  const tipButtonClick = async() => {
    const tipProps = {
      amount: tipAmount,
      receiver: props.userAddress
    }
    await tipAuthor(tipProps)
    setTipAmount('')
    setShowModal(false)
  }



  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 110 110"
          fill="none">
          <g clip-path="url(#clip0_4_583)">
            <path
              d="M108.53 75.6899L90.81 94.6899C90.4267 95.1026 89.9626 95.432 89.4464 95.6573C88.9303 95.8827 88.3732 95.9994 87.81 95.9999H3.81C3.40937 95.9997 3.01749 95.8827 2.68235 95.6631C2.34722 95.4436 2.08338 95.1311 1.92313 94.7639C1.76288 94.3967 1.71318 93.9908 1.78012 93.5958C1.84706 93.2008 2.02772 92.8338 2.3 92.5399L20 73.5399C20.3833 73.1272 20.8474 72.7979 21.3636 72.5725C21.8797 72.3472 22.4368 72.2305 23 72.2299H107C107.404 72.2216 107.802 72.333 108.143 72.5502C108.484 72.7674 108.754 73.0806 108.917 73.4504C109.081 73.8203 109.131 74.2303 109.062 74.6288C108.993 75.0273 108.808 75.3965 108.53 75.6899ZM90.81 37.4199C90.4253 37.0091 89.9608 36.6811 89.445 36.4558C88.9292 36.2306 88.3728 36.1129 87.81 36.11H3.81C3.40937 36.1102 3.01749 36.2272 2.68235 36.4468C2.34722 36.6663 2.08338 36.9788 1.92313 37.346C1.76288 37.7132 1.71318 38.1191 1.78012 38.5141C1.84706 38.9091 2.02772 39.2761 2.3 39.57L20 58.58C20.3847 58.9908 20.8492 59.3188 21.365 59.5441C21.8808 59.7693 22.4372 59.887 23 59.8899H107C107.4 59.8878 107.79 59.7693 108.124 59.5491C108.458 59.3288 108.72 59.0162 108.879 58.6494C109.038 58.2826 109.087 57.8774 109.019 57.4833C108.952 57.0892 108.772 56.7232 108.5 56.43L90.81 37.4199ZM3.81 23.7699H87.81C88.3732 23.7694 88.9303 23.6527 89.4464 23.4273C89.9626 23.202 90.4267 22.8726 90.81 22.4599L108.53 3.45995C108.808 3.16647 108.993 2.79726 109.062 2.39877C109.131 2.00028 109.081 1.59031 108.917 1.22045C108.754 0.850591 108.484 0.537368 108.143 0.320195C107.802 0.103021 107.404 -0.0084012 107 -5.10783e-05H23C22.4368 0.000541762 21.8797 0.117167 21.3636 0.342553C20.8474 0.567938 20.3833 0.897249 20 1.30995L2.3 20.3099C2.02772 20.6038 1.84706 20.9708 1.78012 21.3658C1.71318 21.7608 1.76288 22.1667 1.92313 22.5339C2.08338 22.9011 2.34722 23.2136 2.68235 23.4331C3.01749 23.6527 3.40937 23.7697 3.81 23.7699V23.7699Z"
              fill="url(#paint0_linear_4_583)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_4_583"
              x1="10.81"
              y1="98.29"
              x2="98.89"
              y2="-1.01005"
              gradientUnits="userSpaceOnUse">
              <stop offset="0.08" stop-color="#9945FF" />
              <stop offset="0.3" stop-color="#8752F3" />
              <stop offset="0.5" stop-color="#5497D5" />
              <stop offset="0.6" stop-color="#43B4CA" />
              <stop offset="0.72" stop-color="#28E0B9" />
              <stop offset="0.97" stop-color="#19FB9B" />
            </linearGradient>
          </defs>
        </svg>
      </button>
      {showModal ? (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-full md:w-3/5">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-zinc-800 dark:text-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t gap-3 items-center">
                  <div className="w-12 bg-purple-300 h-12 rounded-full justify-self-start">
                    <Avatar seed={props.userAddress.toString()} />
                  </div>
                  <h3 className="p-1 bg-purple-600 max-w-fit bg-opacity-90 rounded-md text-white">
                    Tip address: {props.userAddress.toString()}
                  </h3>
                  <button
                    className="p-1 ml-auto "
                    onClick={() => setShowModal(false)}>
                    <span className="bg-transparent dark:text-white dark:opacity-100 dark:hover:text-red-500 hover:text-red-500 hover:opacity-100 text-black  text-3xl opacity-50 font-semibold">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p>{props.postDescription}</p>
                </div>
                {/*footer*/}
                <div className="flex justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div className=" ">
                    <input
                      type="number"
                      min="1"
                      value={tipAmount}
                      onChange={onTipChange}
                      className=" rounded-lg border-transparent flex-1 appearance-none border dark:bg-zinc-800 dark:text-white border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Lamports"
                    />
                  </div>
                  <button
                    className="bg-purple-600 text-white hover:bg-purple-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => tipButtonClick()}>
                    Tip User
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default TipAuthorButton;
