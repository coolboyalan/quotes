"use client";
import { useState } from "react";
import QuoteForm from "./QuoteForm";
import AuthorForm from "./AuthorForm";

const AddEntries = ({ allTags, authors }) => {
  const [quoteForm, setQuoteForm] = useState(false);
  const [tagForm, setTagForm] = useState(false);
  const [authorForm, setAuthorForm] = useState(false);

  const toggleQuoteForm = () => {
    setQuoteForm(!quoteForm);
  };

  const toggleTagForm = () => {
    setTagForm(!tagForm);
  };

  const toggleAuthorForm = () => {
    setAuthorForm(!authorForm);
  };

  const quoteFormData = {
    quote: "",
    author: authors[0].id,
    tags: [],
    add: true,
  };

  const authorFormData = {
    name: "",
    add: true,
  };

  return (
    <div className="flex justify-center pb-2">
      {quoteForm && (
        <QuoteForm
          quoteFormData={quoteFormData}
          authors={authors}
          state={toggleQuoteForm}
          allTags={allTags}
        />
      )}
      {authorForm && (
        <AuthorForm authorFormData={authorFormData} state={toggleAuthorForm} />
      )}
      {tagForm && <TagForm tagFormData={tagFormData} state={toggleTagForm} />}
      <button
        className="bg-black text-white px-2 py-1 m-2 rounded overflow-hidden text-center hover:text-yellow-500"
        onClick={toggleQuoteForm}
      >
        Add New Quote
      </button>
      <button
        className="bg-black text-white px-2 py-1 m-2 rounded overflow-hidden text-center hover:text-yellow-500"
        onClick={toggleAuthorForm}
      >
        Add New Author
      </button>
      <button className="bg-black text-white px-2 py-1 m-2 rounded overflow-hidden text-center hover:text-yellow-500">
        Add New Tag
      </button>
    </div>
  );
};

export default AddEntries;
