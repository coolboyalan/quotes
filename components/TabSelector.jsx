"use client";
import React from "react";

const TabSelector = () => {
  const [tab, setTab] = React.useState(true);

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
      
    </>
  );
};

export default TabSelector;
