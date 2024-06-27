import { HeaderFilter, FilterButton } from "./HeaderFilter";
import React from "react";
import Link from "next/link";

const Header = async () => {
  let tags;
  try {
    tags = await fetch(
      `${process.env.URL}/wp-json/wp/v2/quoteTags?acf_format=standard`
    );
    if (tags.ok);
    tags = await tags.json();
    tags = tags.map((ele, index) => {
      return ele.name
    })
    // tags = tags.sort()
  } catch (err) {
    console.log(err);
  }

  return (
    <header className="bg-white text-black sticky top-0 z-20">
      <div className="md:px-24 px-4 py-6 flex justify-between items-center">
        <Link href={"/"}>
          <div className="md:text-6xl text-3xl">
            <span className=" font-bold">DARK</span>ASTIC
          </div>
        </Link>
        <div className="flex items-center">
          <FilterButton />
        </div>
      </div>
      <div className=" bg-white py-[1px]">
        <HeaderFilter tags={tags} />
      </div>
    </header>
  );
};

export default Header;
