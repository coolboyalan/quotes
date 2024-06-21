import { GiSettingsKnobs } from "react-icons/gi";
import {
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaRobot,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className=" bg-black py-[1px]"></div>
      <div className="md:px-24 px-4 py-2 text-center md:flex justify-between items-center">
        <Link href={"/"}>
          {" "}
          <div className="md:text-6xl text-4xl">
            <span className=" font-bold">DARK</span>ASTIC
          </div>
        </Link>
        <div className="flex md:justify-between justify-center min-w-[10%] items-center flex-wrap">
          <div className="flex">
            <Link href={"https://facebook.com"}>
              <FaFacebook className="px-2 text-4xl rounded cursor-pointer" />
            </Link>
            <Link href={"https://linkedin.com"}>
              <FaLinkedin className="px-2 text-4xl rounded cursor-pointer" />
            </Link>
            <Link href={"https://youtube.com"}>
              <FaYoutube className="px-2 text-4xl rounded cursor-pointer" />
            </Link>
            <Link href={"https://instagram.com"}>
              <FaInstagram className="px-2 text-4xl rounded cursor-pointer" />
            </Link>
          </div>
          <Link href={"/user"}>
            <FaRobot className="px-4 text-6xl" />
          </Link>
          <div></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
