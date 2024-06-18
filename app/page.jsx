import Quote from "@/components/Quote";

export const metadata = {
  title: "Darkastic",
  description: "New Quotes Everyday",
};

const Home = async () => {
  try {
    const quoteData = await fetch(
      "https://darkastic.com/wp-json/wp/v2/quotes?acf_format=standard",{cache:'no-store'}
    );

    if (!quoteData.ok) {
      return (
        <section className="bg-white px-4 text-black min-h-100vh">
         'No quotes found'
        </section>
      );
    }
    const quoteDataJson = await quoteData.json();
    const quotes = quoteDataJson.map((ele) => {
      const quote = ele.acf;
      quote.id = ele.id
      return quote
    });

    return (
      <section className="bg-white px-4 text-black">
        <div className="flex flex-wrap md:px-20 pb-20 pt-10 justify-center md:justify-normal">
          {quotes.map((ele, index) => {
            return <Quote key={index} quote={ele} />;
          })}
        </div>
      </section>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Home;
