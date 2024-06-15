import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="flex  w-full justify-center py-10 px-4 items-center">
      <div className="border-black border-[0.5px] rounded md:w-[90%] w-full ">
        <div className="flex justify-between">
          <div className="flex px-2 items-center justify-normal md:justify-normal h-10 w-full">
            <CiSearch className="text-2xl" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none pl-4"
            />
          </div>
          <button className="bg-black text-white px-10 overflow-hidden text-center hover:text-yellow-500">
            Find
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
