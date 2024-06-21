import React from "react";

const SavedQuote = () => {
  return (
    <div
      className={`h-[380px] w-[230px] relative bg-slate-100 rounded shadow-xl overflow-hidden`}
    >
      <img
        src={bgImage ? URL.createObjectURL(bgImage) : null}
        className=" absolute object-cover h-full "
      />
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
  );
};

export default SavedQuote;
