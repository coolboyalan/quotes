"use client";

import React from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import SearchBar from "./SearchBar";
import TabSelector from "./TabSelector";

let filter, setFilter;

const HeaderFilter = ({ tags, authors }) => {
  [filter, setFilter] = React.useState(false);

  const handleFilter = () => {
    setFilter(!filter);
  };

  if (filter) {
    React.useEffect(() => {
      document.getElementById("content").classList.add("hidden");
    }, [filter]);
    return (
      <>
        <SearchBar />
        <TabSelector
          tags={tags}
          authors={authors}
          handleFilter={handleFilter}
        />
      </>
    );
  } else {
    React.useEffect(() => {
      document.getElementById("content").classList.remove("hidden");
    }, [filter]);
    return null;
  }
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
