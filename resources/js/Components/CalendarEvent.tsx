// resources/js/Pages/Calendar/partials/SupervisiCalendar.tsx
import { format, parse, startOfWeek, getDay } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, DateLocalizer, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import "./data-calendar.css";
import { cn } from "@/lib/utils";
import { EventStatus } from "@/types/calendar";
import { router } from "@inertiajs/react";

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

                console.info(transformedEvents);
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

    const CustomToolbar = (toolbar: any) => (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <Button
                        onClick={() => toolbar.onNavigate("PREV")}
                        variant="outline"
                        size="sm"
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        onClick={() => toolbar.onNavigate("NEXT")}
                        variant="outline"
                        size="sm"
                    >
                        Selanjutnya
                    </Button>
                    <Button
                        onClick={() => toolbar.onNavigate("TODAY")}
                        variant="outline"
                        size="sm"
                    >
                        Hari Ini
                    </Button>
                </div>
                <h2 className="text-lg font-semibold">
                    {format(toolbar.date, "MMMM yyyy", { locale: id })}
                </h2>
                <div className="flex gap-2">
                    <Button
                        onClick={() => toolbar.onView("month")}
                        variant={
                            toolbar.view === "month" ? "default" : "outline"
                        }
                        size="sm"
                    >
                        Bulan
                    </Button>
                    <Button
                        onClick={() => toolbar.onView("week")}
                        variant={
                            toolbar.view === "week" ? "default" : "outline"
                        }
                        size="sm"
                    >
                        Minggu
                    </Button>
                    <Button
                        onClick={() => toolbar.onView("day")}
                        variant={toolbar.view === "day" ? "default" : "outline"}
                        size="sm"
                    >
                        Hari
                    </Button>
                </div>
            </div>
        </div>
    );

    const StatusLegend = () => (
        <div className="flex gap-4 p-2 justify-end mb-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                <span className="text-sm">Selesai</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f97316]" />
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
                    <div className="mb-4">
                        <StatusLegend />
                    </div>
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
                            messages={{
                                next: "Selanjutnya",
                                previous: "Sebelumnya",
                                today: "Hari Ini",
                                month: "Bulan",
                                week: "Minggu",
                                day: "Hari",
                                showMore: (total) => `+${total} lainnya`,
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
