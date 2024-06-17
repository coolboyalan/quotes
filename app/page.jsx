import Quote from "@/components/Quote";
import TabSelector from "@/components/TabSelector";

export const metadata = {
  title: "Darkastic",
  description: "New Quotes Everyday",
};

const Home = async () => {
  try {
    const quoteData = await fetch(
      "https://darkastic.com/wp-json/wp/v2/quotes?acf_format=standard"
    );

    if (!quoteData.ok) {
      return (
        <section className="bg-white px-4 text-black">
         'No quotes found'
        </section>
      );
    }

    const quoteDataJson = await quoteData.json();
    const quotes = quoteDataJson.map((ele) => ele.acf);

    return (
      <section className="bg-white px-4 text-black">
        <TabSelector />
        <div className="flex flex-wrap md:px-20 pb-20 justify-center md:justify-normal">
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
