import { GiSettingsKnobs } from "react-icons/gi";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="bg-white text-black">
      <div className="md:px-24 px-4 py-6 flex justify-between items-center">
        <div className="md:text-6xl text-4xl">
          <span className=" font-bold">DARK</span>ASTIC
        </div>
        <GiSettingsKnobs className="md:text-4xl text-2xl cursor-pointer" />
      </div>
      <div className=" bg-black py-[1px]"></div>
      <SearchBar />
    </header>
  );
};

export default Header;
