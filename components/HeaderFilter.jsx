"use client";

import React from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import SearchBar from "./SearchBar";
import TabSelector from "./TabSelector";

let filter, setFilter;

const HeaderFilter = ({tags}) => {
  [filter, setFilter] = React.useState(false);

  if (filter) {
    return (
      <>
        <SearchBar />
        <TabSelector tags={tags} />
      </>
    );
  } else return null;
};

const FilterButton = () => {
  return (
    <GiSettingsKnobs
      className="md:text-4xl text-2xl cursor-pointer font-bold"
      onClick={() => {
        setFilter(!filter);
      }}
    />
  );
};

export { FilterButton, HeaderFilter };
