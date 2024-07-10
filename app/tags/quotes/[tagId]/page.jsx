import db from "@/db/db";
import Quote from "@/components/Quote";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const QuotesByAuthor = async ({ params }) => {
  const tagId = parseInt(params.tagId);
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

  let tag = await db.tag.findUnique({
    where: {
      id: tagId,
    },
    include: {
      quotes: {
        select: {
          quote: true,
          id: true,
        },
      },
    },
  });

  if (!tag) {
    return (
      <div className="md:px-20 pb-20 pt-10 justify-center md:justify-normal">
        No quotes found
      </div>
    );
  }

  const tagName = tag.name;

  tag = tag.quotes.map((ele, index) => {
    return {
      author: author,
      quote: ele.quote,
      id: ele.id,
    };
  });

  if (!tag?.length) {
    return (
      <section className="bg-white px-4 md:px-20 py-10 text-black min-h-100vh">
        'No quotes found'
      </section>
    );
  }

  return (
    <section className="bg-white px-4 text-black min-h-[80vh]">
      <div className="flex flex-wrap md:px-20 pb-20 pt-10 justify-center md:justify-normal">
        {tag.map((ele, index) => {
          const liked = likedQuotes?.includes(ele.id);
          return <Quote key={index} quote={ele} liked={liked} />;
        })}
      </div>
    </section>
  );
};

export default QuotesByAuthor;
