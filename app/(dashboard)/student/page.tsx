import Announcements from "@/components/announcements";
import BigCalendar from "@/components/big-calendar";
import EventCalendar from "@/components/event-calendar";
//import useOriginFull from "@/hooks/use-origin-full";

export default function StudentHome(){
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/**LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="texx-xl font-semibold">Schedule (4A)</h1>
                    <BigCalendar />
                </div>
            </div>

            {/**ROGHT */}
            <div className="v-full xl:w-1/3 flex flex-col gap-8">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    )
}