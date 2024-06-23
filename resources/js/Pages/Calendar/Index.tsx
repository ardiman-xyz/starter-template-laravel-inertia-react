import Authenticated from "@/Layouts/AuthenticatedLayout";
import {CalendarEvent} from "@/Components/CalendarEvent";
import {Head} from "@inertiajs/react";

const CalendarPage = () => {
    return (
        <Authenticated>
            <Head title="Kalender agenda" />
            <div>
                <CalendarEvent />
            </div>
        </Authenticated>
    )
}

export default CalendarPage;
