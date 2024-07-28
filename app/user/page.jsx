import UserForm from "@/components/UserForm";
import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Account = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <UserForm
          address={
            process.env.NODE_ENV === "production"
              ? "https://quotes.alanwebserver.online"
              : "http://localhost:3000"
          }
        />
      </>
    );
  }

  return (
    <section className="bg-white px-4 text-black" id="content">
      <Profile />
    </section>
  );
};

export default Account;
