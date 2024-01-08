import { Heading, Paragraph } from "../components";
import ResetPasswordForm from "../components/feature/ResetPasswordForm";

export default function Home() {
  return (
  
    <main className="h-screen w-screen flex flex-col items-center justify-center before:absolute before:h-[300px] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-gray-600 after:via-gray-400 after:blur-2xl  before:lg:h-[360px] z-[-1]">
      <section className="flex flex-col">
        <Heading title="Reset Password" className="text-center" />
        <Paragraph
          title="You will need this to log in"
          className="text-center"
          />
      </section>
      <ResetPasswordForm />
      <Paragraph title="Schoolshphere @2024" className="text-center mt-12" />
    </main>
          
  );
}
