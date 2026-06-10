import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession()
  if(!session) {
    redirect("/login")  
  }

  return (
    <div>
      <h1>
        Welcome to Shmap - Your Ultimate Shift Scheduling Solution!
      </h1>
    </div>
  );
}
