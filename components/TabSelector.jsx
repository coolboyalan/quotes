"use client";
import React from "react";
import Link from "next/link";

const TabSelector =  ({tags}) => {
  const [tab, setTab] = React.useState(true);

  const sorted = {};
  for (let i = 65; i <= 90; i++) {
    sorted[String.fromCharCode(i)] = [];
  }

  tags?.forEach((ele, index) => {
    const tag = ele.slice(0, 1)
    sorted[tag].push(ele)
  })
  Object.keys(sorted).map(function (key) {
    console.log(key,sorted[key])
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
        {Object.keys(sorted).map((ele, index) => {
          if (sorted[ele].length < 1) {
            return (
              <li
                className="px-6 py-1 absolute -z-20 text-transparent"
                key={index}
              >
              </li>
            );
          }

          return (
            <li className="px-6 py-1 " key={index}>
              <ul className="">
                {sorted[ele].map((key, index) => {
                  return (
                    <Link href={`${key}`}>
                      <li key={index} className="py-1 hover:font-semibold w-fit">
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
