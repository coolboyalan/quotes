"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import Papa from "papaparse";

export default function QuoteForm({ tagFormData, state }) {
  const [sheet, setSheet] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheet),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.sheet);
      }
      setSheet("");
      state(false);
      router.refresh("/admin");
    } catch (error) {
      setError(error.message);
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
            Import Sheet
          </h1>

          {error && (
            <div className="p-4 text-red-600 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="sheet"
              className="block text-sm font-medium text-gray-700"
            >
              Sheet
            </label>
            <input
              type="file"
              id="sheet"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => {
                Papa.parse(e.target.files[0], {
                  complete: function (results) {
                    setSheet(results.data);
                  },
                });
              }}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
