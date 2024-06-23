import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import idLocale from '@fullcalendar/core/locales/id';

const events = [
    { title: 'Meeting', start: new Date() }
];

export const CalendarEvent: React.FC = () => {
    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                events={events}
                eventContent={renderEventContent}
                locale={idLocale}
                firstDay={1} // Senin sebagai hari pertama dalam minggu
                buttonText={{
                    today: 'Hari Ini',
                    month: 'Bulan',
                    week: 'Minggu',
                    day: 'Hari',
                    list: 'Agenda'
                }}
                views={{
                    dayGridMonth: { buttonText: 'Bulan' },
                    timeGridWeek: { buttonText: 'Minggu' },
                    timeGridDay: { buttonText: 'Hari' },
                    listMonth: { buttonText: 'Agenda' }
                }}
                height={"auto"}
            />
        </div>
    );
};

function renderEventContent(eventInfo: any) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}
