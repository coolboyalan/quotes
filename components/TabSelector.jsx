"use client";
import React from "react";
import Link from "next/link";

const TabSelector = ({ tags, authors }) => {
  const [tab, setTab] = React.useState(true);

  const sortedTags = {};
  for (let i = 65; i <= 90; i++) {
    sortedTags[String.fromCharCode(i)] = [];
  }

  tags?.forEach((ele, index) => {
    const tag = ele.slice(0, 1);
    sortedTags[tag].push(ele);
  });

  const sortedAuthors = {};
  for (let i = 65; i <= 90; i++) {
    sortedAuthors[String.fromCharCode(i)] = [];
  }

  authors?.forEach((ele, index) => {
    const author = ele.slice(0, 1).toUpperCase();
    sortedAuthors[author].push(ele);
  });
  return (
    <>
      <div className="flex justify-start md:px-24">
        <div
          className={`px-4 mx-1 ${tab ? "font-semibold" : null} cursor-pointer`}
          onClick={() => {
            setTab(!tab);
          }}
        >
          By Tags
        </div>
        <div
          className={`px-4 mx-1 ${
            !tab ? "font-semibold" : null
          } cursor-pointer`}
          onClick={() => {
            setTab(!tab);
          }}
        >
          By Author
        </div>
      </div>
      <div className="bg-black py-[0.5px] mt-6 mb-2 w-full"></div>
      <ol className=" text-black md:px-24 px-10 py-2 list-[upper-latin] relative">
        {tab
          ? Object.keys(sortedTags).map((ele, index) => {
              if (sortedTags[ele].length < 1) {
                return (
                  <li
                    className="px-6 py-1 absolute -z-20 text-transparent"
                    key={index}
                  ></li>
                );
              }

              return (
                <li className="px-6 py-1 " key={index}>
                  <ul className="">
                    {sortedTags[ele].map((key, index) => {
                      return (
                        <Link href={`${key}`} key={index}>
                          <li className="py-1 hover:font-semibold w-fit">
                            {key}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </li>
              );
            })
          : Object.keys(sortedAuthors).map((ele, index) => {
              if (sortedAuthors[ele].length < 1) {
                return (
                  <li
                    className="px-6 py-1 absolute -z-20 text-transparent"
                    key={index}
                  ></li>
                );
              }

              return (
                <li className="px-6 py-1 " key={index}>
                  <ul className="">
                    {sortedAuthors[ele].map((key, index) => {
                      return (
                        <Link href={`${key}`} key={index}>
                          <li className="py-1 hover:font-semibold w-fit">
                            {key}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
      </ol>
    </>
  );
};

export default TabSelector;
