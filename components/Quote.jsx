"use client";

import { RiEdit2Fill } from "react-icons/ri";
import { FaShare } from "react-icons/fa";
import { toPng } from "html-to-image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Quote = ({ quote, liked }) => {
  const elementRef = React.useRef(null);
  const [visibility, setVisibility] = useState("");
  const router = useRouter();

  const htmlToImageConvert = () => {
    setVisibility("hidden");
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
        setVisibility("");
      })
      .catch((err) => {
        setVisibility("");
        console.log(err);
      });
  };

  const addtoLikedQuotes = (add) => {
    const id = quote.id;

    fetch(`/api/user/likedQuotes?id=${quote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, add }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
        }
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        router.refresh();
      });
  };

  return (
    <>
      <div className="md:m-4 m-2 md:h-[380px] md:w-[240px] h-[72vh] w-[280px]">
        <div
          ref={elementRef}
          className=" bg-slate-100 h-full w-full flex flex-col justify-between rounded shadow-xl"
        >
          <div className="text-2xl font-semibold p-3">{quote.quote}</div>
          <div>
            <div className="p-3">{quote.author}</div>
            <div className={`flex justify-between p-3 ${visibility}`}>
              <Link href={`/quote/edit?id=${quote.id}`} data={quote}>
                <RiEdit2Fill className="cursor-pointer" />
              </Link>
              {liked ? (
                <FaHeart
                  className="cursor-pointer"
                  onClick={() => addtoLikedQuotes(false)}
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer"
                  onClick={() => addtoLikedQuotes(true)}
                />
              )}
              <FaShare
                onClick={htmlToImageConvert}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quote;
