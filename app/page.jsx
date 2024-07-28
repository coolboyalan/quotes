import Quote from "@/components/Quote";
import db from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "Darkastic",
  description: "New Quotes Everyday",
};

const Home = async () => {
  let session = await getServerSession(authOptions);
  let likedQuotes;

  if (session) {
    likedQuotes = await db.user.findUnique({
      where: {
        username: session.user.username,
      },
      select: {
        likedQuotes: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  if (likedQuotes) {
    likedQuotes = likedQuotes?.likedQuotes.map((ele) => ele.id);
  }

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

    if (!quoteData?.length) {
      return (
        <section className="bg-white px-4 text-black min-h-100vh" id="content">
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
      <section className="bg-white px-4 text-black min-h-[80vh]" id="content">
        <div className="flex flex-wrap md:px-20 pb-20 pt-10 justify-center md:justify-normal">
          {quotes.map((ele, index) => {
            const liked = likedQuotes?.includes(ele.id);
            return <Quote key={index} quote={ele} liked={liked} />;
          })}
        </div>
      </section>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Home;
