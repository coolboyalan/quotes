import Quote from "@/components/Quote";
import { QuoteModel,UserModel } from "@/models/models";

export const metadata = {
  title: "Darkastic",
  description: "New Quotes Everyday",
};

const Home = async () => {
  try {
    let quoteData = await QuoteModel.findAll({
    });

    const quotes = quoteData.map((ele) => {
      return ele.dataValues;
    });

    if (!quotes?.length) {
      return (
        <section className="bg-white px-4 text-black min-h-100vh">
          'No quotes found'
        </section>
      );
    }

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
