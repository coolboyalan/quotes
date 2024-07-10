import db from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddEntries from "@/components/admin/AddEntries";
import TableRow from "@/components/admin/TableRow";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Darkastic",
  description: "New Quotes Everyday",
};

const Home = async () => {
  let session = await getServerSession(authOptions);

  if (!session) {
    redirect("/user");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect("/user");
  }

  if (user.role !== "admin") {
    redirect("/user");
  }

  const quotes = await db.quote.findMany({
    select: {
      id: true,
      quote: true,
      author: true,
      tags: true,
    },
  });

  const authors = await db.author.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  const allTags = await db.tag.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  try {
    return (
      <section className="bg-white px-4 text-black min-h-[80vh]">
        <div className="md:px-20 pb-20 pt-10 justify-center md:justify-normal">
          <AddEntries allTags={allTags} authors={authors} />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-black">
            <table className="w-full text-sm text-left rtl:text-right text-black">
              <thead className="text-xs text-black uppercase bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Quote Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quote
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote, index) => (
                  <TableRow
                    quote={quote}
                    authors={authors}
                    allTags={allTags}
                    key={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Home;
