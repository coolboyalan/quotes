"use client";

import { GiSettingsKnobs } from "react-icons/gi";
import SearchBar from "./SearchBar";
import TabSelector from "./TabSelector";
import React from "react";
import Link from "next/link";

const Header = () => {
  const [filter, setFilter] = React.useState(false);

  return (
    <header className="bg-white text-black sticky top-0">
      <div className="md:px-24 px-4 py-6 flex justify-between items-center">
        <Link href={"/"}>
          <div className="md:text-6xl text-3xl">
            <span className=" font-bold">DARK</span>ASTIC
          </div>
        </Link>
        <div className="flex items-center">
          <Link href={'/user'}>
            <button className="bg-black px-2 py-1 text-white rounded-md mr-6">
              Account
            </button>
          </Link>
          <GiSettingsKnobs
            className="md:text-4xl text-2xl cursor-pointer font-bold"
            onClick={() => {
              setFilter(!filter);
            }}
          />
        </div>
      </div>
      <div className=" bg-black py-[1px]"></div>
      {filter ? (
        <>
          <SearchBar />
          <TabSelector />
        </>
      ) : null}
    </header>
  );
};

export default Header;
