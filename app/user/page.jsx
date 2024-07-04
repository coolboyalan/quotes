import UserForm from "@/components/UserForm";
import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Account = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return (
      <>
        <UserForm />
      </>
    );
  }

  return (
    <section className="bg-white px-4 text-black">
        <Profile />
    </section>
  );
};

export default Account;
