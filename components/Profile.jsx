import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TabsRender from "./Tabs";
import db from "@/db/db";
import id from "faker/lib/locales/id_ID";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/user");
  }

  await db.user.update({
    where: {
      username: session.user.username,
    },
    data: {
      likedQuotes: {
        connect: {
          id: 1,
          id: 2,
        },
      },
    },
  });

  const likedQuotes = await db.user.findUnique({
    where: {
      username: session.user.username,
    },
    select: {
      likedQuotes: {
        select: {
          quote: true,
          id:true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!likedQuotes) {
    return (
      <div className="md:px-20 pb-20 pt-10 justify-center md:justify-normal">
        No liked quotes found
      </div>
    );
  }

  const quotes = likedQuotes?.likedQuotes.map((ele) => {
    return {
      author: ele.author.name,
      quote: ele.quote,
      id: ele.id
    };
  });
  return (
    <div className="md:px-20 pb-20 pt-10 justify-center md:justify-normal">
      <TabsRender likedQuotes={quotes} />
    </div>
  );
};

export default Profile;
