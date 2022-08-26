import { useCallback, useState, useEffect, useRef } from "react";
import "@fullcalendar/react/dist/vdom";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "@/lib/axios";
import FullCalendar, {
    DateSelectArg,
    EventInput,
    EventApi,
    EventClickArg,
    EventContentArg,
} from "@fullcalendar/react";
import Dashboard from "@/components/templates/admin/Dashboard";
import Loading from "@/components/parts/Loading";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Task } from "@/types/Task";
import { format } from "date-fns";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

const TopPage: React.FC = () => {
    const thisDate = format(new Date(), "yyyy");
    const navigate = useNavigate();
    const calendarRef = useRef<FullCalendar>(null!);

    const [publicTasks, setPublicTasks] = useState<EventInput[]>([]);
    const [loading, setLoading] = useState(true);

    const getPublicTasks = async () => {
        await axiosApi
            .get(`/api/admin/public_task/calendar/${thisDate}`)
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

    const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
        navigate(`/admin/date/${selectInfo.startStr}`);
    }, []);
    if (loading) {
        return <Loading open={loading} />;
    }
    return (
        <Dashboard title="">
            <div className="calendar">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                        resourceTimeGridPlugin,
                    ]}
                    headerToolbar={{
                        // start: "prev,next today",
                        // center: "title",
                        // end: "dayGridMonth,timeGridWeek,resourceTimeGridDay",
                        end: "prev,next",
                    }}
                    height={"88vh"}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                    slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
                    // initialView="resourceTimeGridDay"
                    // eventContent={renderEventContent}
                    selectable={true}
                    editable={false}
                    // showNonCurrentDates={false}

                    // selectMirror={true}
                    dayMaxEvents={true}
                    // navLinks={true}
                    nowIndicator={true}
                    resources={[
                        { id: "1", title: "フロント", eventColor: "#5aa7de" },
                        { id: "2", title: "厨房", eventColor: "#61dd56" },
                    ]}
                    events={publicTasks}
                    aspectRatio={1.5}
                    locales={allLocales}
                    locale="ja"
                    // eventsSet={handleEvents}
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
