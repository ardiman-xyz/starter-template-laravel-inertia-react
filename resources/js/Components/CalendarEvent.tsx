// resources/js/Pages/Calendar/partials/SupervisiCalendar.tsx
import { format, parse, startOfWeek, getDay, formatDate } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, DateLocalizer, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import "./data-calendar.css";
import { cn } from "@/lib/utils";
import { EventStatus } from "@/types/calendar";
import { router } from "@inertiajs/react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const locales = {
    id: id,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
type EventStatusString = "schedule" | "ongoing" | "finish";

type SupervisiEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    teacher_name: string;
    semester: string;
    academic_year: string;
    status: EventStatusString;
    color: string;
};

type CustomToolbarProps = {
    date: Date;
    onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
};

const SupervisiCalendar = () => {
    const [events, setEvents] = useState<SupervisiEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const statusColorMap: Record<EventStatus, string> = {
        [EventStatus.SCHEDULE]: "border-l-pink-500",
        [EventStatus.FINISH]: "border-l-green-500",
        [EventStatus.ONGOING]: "border-l-orange-500",
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    route("supervisi.calendar.upcoming")
                );
                const transformedEvents = response.data.map((event: any) => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                    title: `Supervisi ${event.teacher_name}`,
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Error fetching supervisi events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const EventComponent = ({ event }: { event: SupervisiEvent }) => (
        <div
            className="p-2"
            onClick={() =>
                router.get(route("visitation.detail", { id: event.id }))
            }
        >
            <div
                className={cn(
                    "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
                    statusColorMap[event.status]
                )}
            >
                <p>{event.title}</p>
            </div>
        </div>
    );

    const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
        return (
            <div className="flex md:flex-row flex-col items-center justify-between">
                <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
                    <Button
                        onClick={() => onNavigate("PREV")}
                        variant={"outline"}
                        size={"icon"}
                        className="flex items-center"
                    >
                        <ChevronLeftIcon className="size-4" />
                    </Button>
                    <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
                        <CalendarIcon className="size-4 mr-2" />
                        <p className="text-sm">
                            {formatDate(date, "MMMM yyyy")}
                        </p>
                    </div>
                    <Button
                        onClick={() => onNavigate("NEXT")}
                        variant={"outline"}
                        size={"icon"}
                        className="flex items-center"
                    >
                        <ChevronRightIcon className="size-4" />
                    </Button>
                </div>
                <StatusLegend />
            </div>
        );
    };

    const StatusLegend = () => (
        <div className="flex gap-4 p-2 justify-end mb-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                <span className="text-sm">Selesai</span>
            </div>
            <div className="flex items-center gap-2 ">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-sm">Dijadwalkan</span>
            </div>
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card className="mb-10">
                <CardHeader>
                    <CardTitle>Jadwal Supervisi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            showAllEvents
                            startAccessor="start"
                            endAccessor="end"
                            className="h-full"
                            components={{
                                event: EventComponent,
                                toolbar: CustomToolbar,
                            }}
                            views={["month"]}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SupervisiCalendar;
