"use client";
import React from "react";
import SavedQuote from "@/components/SavedQuote";
import Quote from "./Quote";

const Tabs = ({ likedQuotes, favorites }) => {
  const [openTab, setOpenTab] = React.useState(2);
  const [library, setLibrary] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap md:justify-normal justify-center">
        <div
          className={`text-xl ${
            !library ? "font-bold" : null
          }  text-black mr-2 cursor-pointer`}
          onClick={() => {
            setLibrary(false);
            setOpenTab(1);
          }}
        >
          My Favorites
        </div>
        <div
          className={`text-xl ${
            library ? "font-bold" : null
          }  text-black mr-2 cursor-pointer`}
          onClick={() => {
            setLibrary(true);
            setOpenTab(2);
          }}
        >
          My Library
        </div>
      </div>
      <div className="flex flex-wrap md:justify-normal justify-center">
        {(library ? favorites : likedQuotes)?.map((ele, index) => {
          return <Quote key={index} quote={ele} liked={true} />;
        })}
      </div>
    </>
  );
};

export default function TabsRender({ likedQuotes, favorites }) {
  return (
    <>
      <Tabs likedQuotes={likedQuotes} />
    </>
  );
}
