import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TabsRender from "./Tabs";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/user");
  }
  console.log(session);

  return (
    <>
      <TabsRender/>
    </>
  );
};

export default Profile;
