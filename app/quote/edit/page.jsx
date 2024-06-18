import QuoteEditor from "@/components/Editor";

const QuoteEditPage = async ({ searchParams }) => {
  const { id } = searchParams;

  const quoteData = await fetch(
    `https://darkastic.com/wp-json/wp/v2/quotes/${id}?acf_format=standard`
  );

  if (quoteData.ok) {
      const quoteDataJson = await quoteData.json();
      return (
        <section className="bg-white px-4 text-black">
          <div className="flex flex-wrap md:px-20 pb-20 pt-10 justify-center md:justify-normal">
            <QuoteEditor quote={quoteDataJson} />;
          </div>
        </section>
      );
  }
};

export default QuoteEditPage;
