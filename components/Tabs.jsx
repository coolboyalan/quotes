"use client";
import React from "react";
import SavedQuote from "@/components/SavedQuote";
import Quote from "./Quote";

const Tabs = async () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [library, setLibrary] = React.useState(true);

  const quoteData = await fetch(
    "https://darkastic.com/wp-json/wp/v2/quotes?acf_format=standard",
    { cache: "no-store" }
  );

  if (!quoteData.ok) {
    return (
      <section className="bg-white px-4 text-black min-h-100vh">
        'No quotes found'
      </section>
    );
  }
  const quoteDataJson = await quoteData.json();
  const quotes = quoteDataJson.map((ele) => {
    const quote = ele.acf;
    quote.id = ele.id;
    return quote;
  });

  return (
    <>
      <div className="flex flex-wrap ">
        <div
          className={`text-xl ${
            library ? "font-bold" : null
          }  text-black mr-2 cursor-pointer`}
          onClick={() => setLibrary(!library)}
        >
          My Library
        </div>
        <div
          className={`text-xl ${
            !library ? "font-bold" : null
          }  text-black mr-2 cursor-pointer`}
          onClick={() => setLibrary(!library)}
        >
          My Favorites
        </div>
      </div>
      <div className="flex flex-wrap md:justify-normal justify-center">
        {quotes.map((ele, index) => {
          return <Quote key={index} quote={ele} />;
        })}
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs />
    </>
  );
}
