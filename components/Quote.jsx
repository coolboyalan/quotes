"use client";

import { FaHeart } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { FaShare } from "react-icons/fa";
import { toPng } from "html-to-image";
import { FaRegHeart } from "react-icons/fa";
import React from "react";

const Quote = ({ quote }) => {
  const elementRef = React.useRef(null);

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-4 h-[380px] w-[240px]">
      <div
        ref={elementRef}
        className=" bg-slate-100 h-full w-full flex flex-col justify-between rounded shadow-xl"
      >
        <div className="text-2xl font-semibold p-3">{quote.quote}</div>
        <div>
          <div className="p-3">{quote.author}</div>
          <div className="flex justify-between p-3">
            <RiEdit2Fill className="cursor-pointer" />
            <FaRegHeart className="cursor-pointer" />
            <FaShare onClick={htmlToImageConvert} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
