import { getServerSession } from "next-auth";
import { Heading, Paragraph } from "./components";
import LoginForm from "./components/feature/LoginForm";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Login() {
 
  const session = await getServerSession(authOptions)

  if(session?.user.accessToken){
    redirect("/dashboard")
  }
  return (
    <>
      <main className="h-screen w-screen flex flex-col items-center justify-center before:absolute before:h-[300px] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-gray-800 after:via-gray-900 after:blur-2xl  before:lg:h-[360px] z-[-1]">
        <section className="flex flex-col">
          <Heading title="Welcome Back, Log In" className="text-center" />
          <Paragraph
            title="Enter credentials to log in"
            className="text-center"
          />
        </section>
        <LoginForm />
        <Paragraph title="Schoolshphere @2024" className="text-center mt-12" />
      </main>
    </>
  );
}
