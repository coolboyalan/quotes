import Quote from "@/components/Quote";
import db from "@/db/db";
import { name } from "faker/lib/locales/az";
import id from "faker/lib/locales/id_ID";

export const metadata = {
  title: "Darkastic",
  description: "New Quotes Everyday",
};

const Home = async () => {
  try {
    const quoteData = await db.quote.findMany({
      select: {
        quote: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(quoteData);
    if (!quoteData?.length) {
      return (
        <section className="bg-white px-4 text-black min-h-100vh">
          'No quotes found'
        </section>
      );
    }

    const quotes = quoteData.map((ele) => {
      return {
        author: ele.author.name,
        quote: ele.quote,
        id: ele.id,
      };
    });
    return (
      <section className="bg-white px-4 text-black min-h-[80vh]">
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
