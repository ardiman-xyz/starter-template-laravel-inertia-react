import SupervisiCalendar from "@/Components/CalendarEvent";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const CalendarPage = () => {
    return (
        <Authenticated>
            <Head title="Kalender agenda" />
            <div className="mb-10">
                <SupervisiCalendar />
            </div>
        </Authenticated>
    );
};

export default CalendarPage;
