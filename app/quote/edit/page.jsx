import QuoteEditor from "@/components/Editor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Profile from "@/components/Profile";

const QuoteEditPage = async ({ searchParams }) => {
  const { id } = searchParams;

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/user");
  }

  const quoteData = await fetch(
    `https://darkastic.com/wp-json/wp/v2/quotes/${id}?acf_format=standard`
  );

  if (quoteData.ok) {
    const quoteDataJson = await quoteData.json();
    return (
      <section className="bg-white px-4 text-black min-h-[80vh]">
        <div className="flex flex-wrap md:px-20 pb-20 pt-10 justify-center md:justify-normal">
          <QuoteEditor quote={quoteDataJson} />;
        </div>
        <div className="flex flex-wrap md:px-20 pb-20 pt-10 justify-center md:justify-normal">
          <Profile />
        </div>
      </section>
    );
  } else {
    return <>No Quote Found</>;
  }
};

export default QuoteEditPage;
