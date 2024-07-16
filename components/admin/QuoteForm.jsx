"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";

export default function QuoteForm({ quoteFormData, state, authors, allTags }) {
  const defaultError =
    !authors || !authors.length ? "NO authors found, Please a new author" : "";
  const [quote, setQuote] = useState(quoteFormData.quote);
  const [author, setAuthor] = useState(quoteFormData.author);
  const [tagNames, setTagNames] = useState(
    quoteFormData.tags.map((tag) => tag.name)
  );
  const [tagIds, setTagIds] = useState(quoteFormData.tags.map((tag) => tag.id));
  const [error, setError] = useState(defaultError);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/quote", {
        method: quoteFormData.add ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote,
          author: parseInt(author),
          id: quoteFormData.id,
          tags: tagIds,
        }),
      });

      if (!res.ok) {
        throw new Error(
          quoteFormData.add ? "Failed to add quote" : "Failed to update quote"
        );
      }
      setQuote("");
      setAuthor("");
      setTagNames([]);
      state(false);
      router.refresh("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTagChange = (tag) => {
    if (tagNames.includes(tag.name)) {
      setTagNames(tagNames.filter((t) => t !== tag.name));
      setTagIds(tagIds.filter((t) => t !== tag.id));
    } else {
      setTagNames([...tagNames, tag.name]);
      setTagIds([...tagIds, tag.id]);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-20 z-10 ">
      <div className="flex items-center justify-center rounded relative">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
        >
          <RxCross1
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => state(false)}
          />
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Submit a Quote
          </h1>

          {error && (
            <div className="p-4 text-red-600 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="quote"
              className="block text-sm font-medium text-gray-700"
            >
              Quote
            </label>
            <input
              type="text"
              id="quote"
              value={quote || ""}
              onChange={(e) => setQuote(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <select
            name="author"
            id="author"
            className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            required
            defaultValue={author}
          >
            {authors.map((ele, index) => {
              if (author === ele.name) setAuthor(ele.id);
              return (
                <option key={index} value={ele.id}>
                  {ele.name}
                </option>
              );
            })}
          </select>

          <div>
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Tags
            </label>
            <div className="overflow-y-scroll max-h-[15vh]">
              {allTags.map((ele, index) => {
                return (
                  <div className="flex items-center" key={index}>
                    <input
                      type="checkbox"
                      name="tag"
                      key={index}
                      value={ele.id}
                      placeholder={ele.name}
                      checked={tagNames.includes(ele.name)}
                      onChange={() => handleTagChange(ele)}
                    ></input>
                    <label
                      htmlFor="tag"
                      className="block text-sm font-medium text-gray-700 px-2"
                    >
                      {ele.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            disabled={!authors?.length}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
