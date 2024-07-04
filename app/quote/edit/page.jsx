import QuoteEditor from "@/components/Editor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import { QuoteModel, UserModel } from "@/models/models";


const QuoteEditPage = async ({ searchParams }) => {
  const { id } = searchParams;

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/user");
  }

  let quote = await QuoteModel.findByPk(id);

  quote = quote?.toJSON();
  if (quote) {
    return (
      <section className="bg-white px-4 text-black min-h-[80vh]">
        <div className="flex flex-wrap md:px-20 pb-20 pt-10 justify-center md:justify-normal">
          <QuoteEditor quote={quote} />;
        </div>
        <Profile />
      </section>
    );
  } else {
    return <>No Quote Found</>;
  }
};

export default QuoteEditPage;
