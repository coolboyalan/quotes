import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TabsRender from "./Tabs";
import { UserModel, QuoteModel } from "@/models/models";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/user");
  }

  let likedQuotes = await UserModel.findByPk(session.user.id, {
    include: [
      {
        model: QuoteModel,
        as: "likedQuotes",
      },
    ],
  });

  likedQuotes = likedQuotes?.toJSON()
 
  return (
    <div className="md:px-20 pb-20 pt-10 justify-center md:justify-normal">
      <TabsRender likedQuotes={likedQuotes?.likedQuotes} />
    </div>
  );
};

export default Profile;
