"use client";

import { useSearchParams } from "next/navigation";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { RiAlignItemHorizontalCenterFill } from "react-icons/ri";
import { RiAlignItemRightFill } from "react-icons/ri";
import { FaShare } from "react-icons/fa";
import { toPng } from "html-to-image";
import React from "react";
import {
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Oswald,
  Poppins,
  Ubuntu,
  Playfair_Display,
  Merriweather,
  Nunito,
  Crimson_Text,
  Raleway,
  PT_Sans,
  Josefin_Sans,
  Roboto_Slab,
  Karla,
  Work_Sans,
  Fira_Sans,
  Noto_Sans,
  Titillium_Web,
  Arvo,
  PT_Serif,
  Vollkorn,
  Bitter,
  Cabin,
  Old_Standard_TT,
  PT_Mono,
  Inconsolata,
  Space_Mono,
  Source_Code_Pro,
  Anonymous_Pro,
  Courier_Prime,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  IBM_Plex_Mono,
  // Additional fonts
  Oswald_Bold,
  Cabin_Condensed,
  IBM_Plex_Mono_Bold,
  Inter,
  Yantramanav,
  Signika,
} from "next/font/google";

// Font instances
const inter = Inter({ subsets: ["latin"], weight: "400" });
const yantramanav = Yantramanav({ subsets: ["latin"], weight: "400" });
const signika = Signika({ subsets: ["latin"], weight: "400" });

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const oswald = Oswald({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: "400" });
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });
const nunito = Nunito({ subsets: ["latin"], weight: "400" });
const crimsonText = Crimson_Text({ subsets: ["latin"], weight: "400" });
const raleway = Raleway({ subsets: ["latin"], weight: "400" });
const ptSans = PT_Sans({ subsets: ["latin"], weight: "400" });
const josefinSans = Josefin_Sans({ subsets: ["latin"], weight: "400" });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: "400" });
const karla = Karla({ subsets: ["latin"], weight: "400" });
const workSans = Work_Sans({ subsets: ["latin"], weight: "400" });
const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });
const titilliumWeb = Titillium_Web({ subsets: ["latin"], weight: "400" });
const arvo = Arvo({ subsets: ["latin"], weight: "400" });
const ptSerif = PT_Serif({ subsets: ["latin"], weight: "400" });
const vollkorn = Vollkorn({ subsets: ["latin"], weight: "400" });
const bitter = Bitter({ subsets: ["latin"], weight: "400" });
const cabin = Cabin({ subsets: ["latin"], weight: "400" });
const oldStandardTT = Old_Standard_TT({ subsets: ["latin"], weight: "400" });
const ptMono = PT_Mono({ subsets: ["latin"], weight: "400" });
const inconsolata = Inconsolata({ subsets: ["latin"], weight: "400" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: "400" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: "400" });
const anonymousPro = Anonymous_Pro({ subsets: ["latin"], weight: "400" });
const courierPrime = Courier_Prime({ subsets: ["latin"], weight: "400" });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: "400" });
const ibmPlexSerif = IBM_Plex_Serif({ subsets: ["latin"], weight: "400" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400" });
// Additional fonts
const cabinCondensed = Cabin_Condensed({ subsets: ["latin"], weight: "400" });

const QuoteEditor = ({ quote }) => {
  const [quoteColor, setQuoteColor] = React.useState("#000000");
  const [authorColor, setAuthorColor] = React.useState("#000000");

  const [quoteAlign, setQuoteAlign] = React.useState("left");
  const [authorAlign, setAuthorAlign] = React.useState("left");

  const [quoteFont, setQuoteFont] = React.useState(roboto.style.fontFamily);
  const [authorFont, setAuthorFont] = React.useState(roboto.style.fontFamily);

  const [bgImage, setBgImage] = React.useState();
  const [bgColor, setBgColor] = React.useState("transparent");

  const elementRef = React.useRef(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fontOptions = [
    { label: "Roboto", value: roboto.style.fontFamily },
    { label: "Open Sans", value: openSans.style.fontFamily },
    { label: "Lato", value: lato.style.fontFamily },
    { label: "Montserrat", value: montserrat.style.fontFamily },
    { label: "Oswald", value: oswald.style.fontFamily },
    { label: "Poppins", value: poppins.style.fontFamily },
    { label: "Ubuntu", value: ubuntu.style.fontFamily },
    { label: "Playfair Display", value: playfairDisplay.style.fontFamily },
    { label: "Merriweather", value: merriweather.style.fontFamily },
    { label: "Nunito", value: nunito.style.fontFamily },
    { label: "Crimson Text", value: crimsonText.style.fontFamily },
    { label: "Raleway", value: raleway.style.fontFamily },
    { label: "PT Sans", value: ptSans.style.fontFamily },
    { label: "Josefin Sans", value: josefinSans.style.fontFamily },
    { label: "Roboto Slab", value: robotoSlab.style.fontFamily },
    { label: "Karla", value: karla.style.fontFamily },
    { label: "Work Sans", value: workSans.style.fontFamily },
    { label: "Fira Sans", value: firaSans.style.fontFamily },
    { label: "Noto Sans", value: notoSans.style.fontFamily },
    { label: "Titillium Web", value: titilliumWeb.style.fontFamily },
    { label: "Arvo", value: arvo.style.fontFamily },
    { label: "PT Serif", value: ptSerif.style.fontFamily },
    { label: "Vollkorn", value: vollkorn.style.fontFamily },
    { label: "Bitter", value: bitter.style.fontFamily },
    { label: "Cabin", value: cabin.style.fontFamily },
    { label: "Old Standard TT", value: oldStandardTT.style.fontFamily },
    { label: "PT Mono", value: ptMono.style.fontFamily },
    { label: "Inconsolata", value: inconsolata.style.fontFamily },
    { label: "Space Mono", value: spaceMono.style.fontFamily },
    { label: "Source Code Pro", value: sourceCodePro.style.fontFamily },
    { label: "Anonymous Pro", value: anonymousPro.style.fontFamily },
    { label: "Courier Prime", value: courierPrime.style.fontFamily },
    { label: "IBM Plex Sans", value: ibmPlexSans.style.fontFamily },
    { label: "IBM Plex Serif", value: ibmPlexSerif.style.fontFamily },
    { label: "IBM Plex Mono", value: ibmPlexMono.style.fontFamily },
    // Additional fonts
    { label: "Cabin Condensed", value: cabinCondensed.style.fontFamily },
    { label: "Inter", value: inter.style.fontFamily },
    { label: "Yantramanav", value: yantramanav.style.fontFamily },
    { label: "Signika", value: signika.style.fontFamily },
    // Add more fonts as needed
  ];

  quote = quote.acf;

  return (
    <>
      <div
        ref={elementRef}
        className={`h-[380px] w-[230px] relative bg-slate-100 rounded shadow-xl overflow-hidden`}
      >
        {bgImage ? (
          <img
            src={bgImage ? URL.createObjectURL(bgImage) : null}
            className=" absolute object-cover h-full "
          />
        ) : null}
        <div
          className="h-full w-full flex flex-col justify-between absolute z-10"
          style={{ backgroundColor: bgColor }}
        >
          <div
            className="text-2xl font-semibold p-3"
            style={{
              color: quoteColor,
              textAlign: quoteAlign,
              fontFamily: quoteFont,
            }}
          >
            {quote.quote}
          </div>
          <div>
            <div
              className="p-3"
              style={{
                color: authorColor,
                textAlign: authorAlign,
                fontFamily: authorFont,
              }}
            >
              {quote.author}
            </div>
            {/* <div className="flex justify-end p-3 text-2xl">
              <FaShare
                onClick={htmlToImageConvert}
                className="cursor-pointer"
              />
            </div> */}
          </div>
        </div>
        {/* <button className="p-2 rounded px-4 hidden md:block bg-black my-4 text-white">
          Save to Library
        </button> */}
      </div>
      <div className=" mx-4 my-4 md:my-0 h-[380px] w-[200px] text-black flex flex-col justify-between">
        <div className="bg-slate-100 h-full w-full flex flex-col rounded shadow-xl">
          <select
            name="font"
            id="font"
            className="text-black my-2 p-2 w-[90%] self-center"
            onChange={(event) => {
              setQuoteFont(event.target.value);
            }}
          >
            {fontOptions.map((font, index) => (
              <option key={index} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          <input
            type="color"
            value={quoteColor}
            id="colorPicker"
            className="w-full px-2 rounded my-2"
            onChange={(event) => {
              setQuoteColor(event.target.value);
            }}
          />
          <div>
            <div className="flex justify-between text-2xl p-3">
              <RiAlignItemLeftFill
                onClick={() => {
                  setQuoteAlign("left");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemHorizontalCenterFill
                onClick={() => {
                  setQuoteAlign("center");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemRightFill
                onClick={() => {
                  setQuoteAlign("right");
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-100 h-full w-full flex flex-col rounded shadow-xl">
          <input
            type="color"
            value={quoteColor}
            id="colorPicker"
            className="w-full px-2 rounded my-2"
            onChange={(event) => {
              setBgColor(event.target.value);
            }}
          />
          <input
            type="file"
            accept="image/*"
            className="py-1 px-2"
            placeholder="Select"
            onChange={(event) => {
              setBgImage(event.target.files[0]);
              setBgColor("transparent");
            }}
          />
        </div>
        <div className="bg-slate-100 h-full w-full flex flex-col rounded shadow-xl">
          <select
            name="font"
            id="font"
            className="text-black my-2 p-2 w-[90%] self-center"
            onChange={(event) => {
              setAuthorFont(event.target.value);
            }}
          >
            {fontOptions.map((font, index) => (
              <option key={index} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          <input
            type="color"
            value={authorColor}
            id="colorPicker"
            className="w-full px-2 rounded my-2"
            onChange={(event) => {
              setAuthorColor(event.target.value);
            }}
          />
          <div>
            <div className="flex justify-between text-2xl p-3">
              <RiAlignItemLeftFill
                onClick={() => {
                  setAuthorAlign("left");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemHorizontalCenterFill
                onClick={() => {
                  setAuthorAlign("center");
                }}
                className="cursor-pointer"
              />
              <RiAlignItemRightFill
                onClick={() => {
                  setAuthorAlign("right");
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <button
          className="p-2 rounded px-4  bg-black my-4 text-white"
          onClick={htmlToImageConvert}
        >
          Download Photo
        </button>
        {/* <button className="p-2 rounded px-4 md:hidden bg-black my-4 text-white">
          Save to Library
        </button> */}
      </div>
    </>
  );
};

export default QuoteEditor;
