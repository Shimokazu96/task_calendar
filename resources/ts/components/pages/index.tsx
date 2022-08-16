import { useCallback, useState } from "react";
import "@fullcalendar/react/dist/vdom";
import FullCalendar, {
    DateSelectArg,
    DayCellContentArg,
    EventApi,
    EventClickArg,
    EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "@/lib/event-utils";

const TopPage: React.FC = () => {
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const handleEvents = useCallback(
        (events: EventApi[]) => setCurrentEvents(events),
        []
    );
    const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
        let title = prompt("イベントのタイトルを入力してください")?.trim();
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
        }
    }, []);
    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        if (
            window.confirm(
                `このイベント「${clickInfo.event.title}」を削除しますか`
            )
        ) {
            clickInfo.event.remove();
        }
    }, []);
    const renderEventContent = (eventContent: EventContentArg) => (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    );

    return (
        <div className="calendar">
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ]}
                headerToolbar={{
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
                initialView="dayGridMonth"
                eventContent={renderEventContent}
                selectable={true}
                editable={true}
                selectMirror={true}
                dayMaxEvents={true}
                navLinks={true}
                nowIndicator={true}
                initialEvents={INITIAL_EVENTS}
                aspectRatio={1.5}
                locales={allLocales}
                locale="ja"
                eventsSet={handleEvents}
                select={handleDateSelect}
                eventClick={handleEventClick}
                // dayCellContent={(event: DayCellContentArg) =>
                //     (event.dayNumberText = event.dayNumberText.replace(
                //         "日",
                //         ""
                //     ))
                // }
            />
        </div>
    );
};

export default TopPage;
