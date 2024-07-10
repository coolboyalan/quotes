import { HeaderFilter, FilterButton } from "./HeaderFilter";
import React from "react";
import Link from "next/link";
import db from "@/db/db";

const Header = async () => {
  let tags, authors;
  try {
    tags = await db.tag.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    tags = tags.sort((a, b) => a.name.localeCompare(b.name));

    authors = await db.author.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    authors = authors.sort((a, b) => a.name.localeCompare(b.name));
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
        <HeaderFilter tags={tags} authors={authors} />
      </div>
    </header>
  );
};

export default Header;
