import { Calender } from "@/components/utilities/Calender";
import { CalenderEvent } from "@/components/utilities/CalenderEvent";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions)
  if(!session) {
    redirect("/login")  
  }

  console.log(session)

  return (
    <div className="h-full max-h-full w-full max-w-full text-xs p-2 space-y-2">
      <h1>  
        Welcome to the dashboard
      </h1>

      {/* card statistics and calender */}
      <div className="flex h-84 gap-2">
        
        {/* Card Statistics */}
        <div className="flex-1 h-full rounded gap-2 flex flex-wrap">
          <div className="w-60 min-w-60 flex-1 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white h-41">
            qdw
          </div>
          <div className="w-60 min-w-60 flex-1 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white h-41">
            awd
          </div>
          <div className="w-60 min-w-60 flex-1 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white h-41">
            
          </div>
          <div className="w-60 min-w-60 flex-1 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white h-41">
            
          </div>
        </div>

        {/* Calender Container */}
        <div className="flex-1 bg-black h-full rounded p-1 flex">

          {/* Calender */}
          <div className="border-white/10  border w-80 min-w-80 h-full rounded text-text-secondary">
            <Calender />
          </div>

          {/* Events */}
          <div className="w-full bg-background h-full rounded">
            <h2 className="p-2 "> 
              Events
            </h2>

            <div className="h-[calc(100%-32px)] relative pl-4 pr-2 space-y-2">

              {/* Marker line */}
              <div className="absolute left-px h-full ml-5 w-2 border-l border-border-main/20" />

              {/* Calender Event */}
              <CalenderEvent />
              <CalenderEvent />
              <CalenderEvent />

            </div>
          </div>

        </div>
      </div>  
    </div>
  );
}
