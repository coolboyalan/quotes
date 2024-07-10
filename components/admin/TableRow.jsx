"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QuoteForm from "./QuoteForm";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const TableRow = ({ quote, authors, allTags }) => {
  const router = useRouter();
  const quoteId = quote.id;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const deleteQuoteWithId = (event) => {
    event.preventDefault();

    fetch(`/api/admin/quote`, {
      method: "DELETE",
      body: JSON.stringify({ id: quoteId }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        router.refresh("/admin");
      }
    });
  };

  const quoteFormData = {
    quote: quote.quote,
    author: quote.author.name,
    tags: quote.tags.flat(),
    id: quoteId,
  };

  const tags = quote.tags.map((tag) => tag.name);

  return (
    <>
      {isPopupVisible && (
        <QuoteForm
          quoteFormData={quoteFormData}
          authors={authors}
          state={togglePopup}
          allTags={allTags}
        />
      )}
      <tr className="bg-white">
        <td className="px-6 py-4">{quoteId}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-black whitespace-nowrap "
        >
          {quote.quote}
        </th>
        <td className="px-6 py-4">{quote.author.name}</td>
        <td className="px-6 py-4">{tags.flat().join(", ")}</td>
        <td className="px-6 py-4">
          <button
            href={`/admin/quote/${quoteId}`}
            onClick={togglePopup}
            className="font-medium text-white hover:underline bg-green-500 px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            href="#"
            className="font-medium text-white hover:underline bg-red-500 px-3 m-2 md:mx-2 mx-0 py-1 rounded"
            onClick={() => deleteQuoteWithId(event)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
