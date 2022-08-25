import { useCallback, useState, useEffect } from "react";
import "@fullcalendar/react/dist/vdom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import FullCalendar, {
    DateSelectArg,
    EventInput,
    EventApi,
    EventClickArg,
    EventContentArg,
} from "@fullcalendar/react";
import { CircularProgress } from "@mui/material";
import Dashboard from "@/components/templates/admin/Dashboard";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "@/lib/event-utils";
import { Task } from "@/types/Task";
import { format } from "date-fns";
import useNotification from "@/hooks/useNotification";

const TopPage: React.FC = () => {
    const thisMonth = format(new Date(), "yyyy-MM");
    console.log(thisMonth);

    const [publicTasks, setPublicTasks] = useState<EventInput[]>([]);
    const [loading, setLoading] = useState(true);
    const { deleted } = useNotification();

    const getPublicTasks = async () => {
        await axiosApi
            .get(`/api/admin/public_task/calendar/${thisMonth}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTasks(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };

    useEffect(() => {
        getPublicTasks();
    }, []);

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
    // const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    //     if (
    //         window.confirm(
    //             `このイベント「${clickInfo.event.title}」を削除しますか`
    //         )
    //     ) {
    //         clickInfo.event.remove();
    //     }
    // }, []);
    // const renderEventContent = (eventContent: EventContentArg) => (
    //     <>
    //         <b>{eventContent.timeText}</b>
    //         <i>{eventContent.event.title}</i>
    //     </>
    // );
    if (loading) {
        return (
            <Dashboard title="">
                <CircularProgress />
            </Dashboard>
        );
    }
    return (
        <Dashboard title="">
            <div className="calendar">
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    height={"88vh"}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                    slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
                    initialView="dayGridMonth"
                    // eventContent={renderEventContent}
                    selectable={true}
                    // editable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    navLinks={true}
                    nowIndicator={true}
                    events={publicTasks}
                    aspectRatio={1.5}
                    locales={allLocales}
                    locale="ja"
                    eventsSet={handleEvents}
                    select={handleDateSelect}
                    // eventClick={handleEventClick}
                    // dayCellContent={(event: DayCellContentArg) =>
                    //     (event.dayNumberText = event.dayNumberText.replace(
                    //         "日",
                    //         ""
                    //     ))
                    // }
                />
            </div>
        </Dashboard>
    );
};

export default TopPage;
