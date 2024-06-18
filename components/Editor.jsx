"use client";

import { useSearchParams } from "next/navigation";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { RiAlignItemHorizontalCenterFill } from "react-icons/ri";
import { RiAlignItemRightFill } from "react-icons/ri";
import { FaShare } from "react-icons/fa";
import { toPng } from "html-to-image";
import React from "react";

const QuoteEditor = ({ quote }) => {
  const [quoteColor, setQuoteColor] = React.useState("#000000");
  const [authorColor, setAuthorColor] = React.useState("#000000");

  const [quoteAlign, setQuoteAlign] = React.useState("left");
  const [authorAlign, setAuthorAlign] = React.useState("left");

  const elementRef = React.useRef(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  quote = quote.acf;

  return (
    <>
      <div className={`m-4 h-[380px] w-[200px]`}>
        <div
          ref={elementRef}
          className=" bg-slate-100 h-full w-full flex flex-col justify-between rounded shadow-xl "
        >
          <div
            className={`text-2xl font-semibold p-3`}
            style={{ color: quoteColor, textAlign: quoteAlign }}
          >
            {quote.quote}
          </div>
          <div>
            <div
              className={`p-3`}
              style={{ color: authorColor, textAlign: authorAlign }}
            >
              {quote.author}
            </div>
            <div className="flex justify-end p-3 text-2xl">
              <FaShare
                onClick={htmlToImageConvert}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <button className="p-2 rounded px-4 hidden md:block bg-black my-4 text-white">
          Save to Library
        </button>
      </div>
      <div className="m-4 h-[380px] w-[200px] text-black flex flex-col justify-between">
        <div className=" bg-slate-100 h-full w-full flex flex-col rounded shadow-xl ">
          <select
            name="font"
            id="font"
            className="text-black my-2 p-2 w-[90%] self-center"
          >
            <option value="option1">One</option>
            <option value="option1">Two</option>
            <option value="option1">Three</option>
            <option value="option1">Four</option>
            <option value="option1">Five</option>
            <option value="option1">Six</option>
          </select>
          <input
            type="color"
            value={quoteColor}
            id="colorPicker"
            className="w-full px-2 rounded my-2"
            onChange={(event) => {
              setQuoteColor(event.target.value);
              console.log(quoteColor);
            }}
          />
          <div>
            <div className="flex justify-between text-2xl p-3">
              <RiAlignItemLeftFill
                onClick={() => {
                  setQuoteAlign("left");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemHorizontalCenterFill
                onClick={() => {
                  setQuoteAlign("center");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemRightFill
                onClick={() => {
                  setQuoteAlign("right");
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className=" bg-slate-100 h-full w-full flex flex-col rounded shadow-xl ">
          <select
            name="font"
            id="font"
            className="text-black my-2 p-2 w-[90%] self-center"
          >
            <option value="option1">One</option>
            <option value="option1">Two</option>
            <option value="option1">Three</option>
            <option value="option1">Four</option>
            <option value="option1">Five</option>
            <option value="option1">Six</option>
          </select>
          <input
            type="color"
            value={authorColor}
            id="colorPicker"
            className="w-full px-2 rounded my-2"
            onChange={(event) => {
              setAuthorColor(event.target.value);
            }}
          />
          <div>
            <div className="flex justify-between text-2xl p-3">
              <RiAlignItemLeftFill
                onClick={() => {
                  setAuthorAlign("left");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemHorizontalCenterFill
                onClick={() => {
                  setAuthorAlign("center");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemRightFill
                onClick={() => {
                  setAuthorAlign("right");
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <button className="p-2 rounded px-4 md:hidden bg-black my-4 text-white">
          Save to Library
        </button>
      </div>
    </>
  );
};

export default QuoteEditor;
