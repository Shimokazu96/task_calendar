import { useState, useEffect, useRef } from "react";
import "@fullcalendar/react/dist/vdom";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { axiosApi } from "@/lib/axios";
import FullCalendar, { EventInput } from "@fullcalendar/react";
import Loading from "@/components/parts/Loading";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import useWindowSize from "@/hooks/useWindowSize";

const CurrentDatePage: React.FC = () => {
    const params = useParams();
    const thisDate = format(new Date(), "yyyy");

    const calendarRef = useRef<FullCalendar>(null!);
    const [publicTasks, setPublicTasks] = useState<EventInput[]>([]);
    const [sections, setSections] = useState<EventInput[]>([]);
    const [loading, setLoading] = useState(true);
    const [width, height] = useWindowSize();
    const calendarHeight = height - 60;
    // const dayMinWidth = sections.length > 3 ? 200 : undefined;
    const dayMinWidth = 200;

    const getPublicTasks = async () => {
        await axiosApi
            .get(`/api/public_task/calendar/${thisDate}`)
            .then((response: AxiosResponse) => {
                setPublicTasks(response.data);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };
    const getSections = async () => {
        await axiosApi
            .get(`/api/time_grid/section`)
            .then((response: AxiosResponse) => {
                setSections(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };

    useEffect(() => {
        getPublicTasks();
        getSections();
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }
    return (
        <>
            <div className="frontCalendar">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                        resourceTimeGridPlugin,
                        scrollGridPlugin,
                    ]}
                    headerToolbar={{
                        start: "title",
                        center: "",
                        // end: "dayGridMonth,timeGridWeek,resourceTimeGridDay",
                        // end: "",
                        end: "today,prev,next",
                    }}
                    height={calendarHeight}
                    dayMinWidth={dayMinWidth}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                    slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
                    initialView="resourceTimeGridDay"
                    initialDate={params.date}
                    droppable={false}
                    allDaySlot={false}
                    dayMaxEvents={true}
                    nowIndicator={true}
                    resources={sections}
                    events={publicTasks}
                    aspectRatio={1.5}
                    locales={allLocales}
                    locale="ja"
                />
            </div>
        </>
    );
};

export default CurrentDatePage;
