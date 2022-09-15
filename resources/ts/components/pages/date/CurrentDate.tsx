import { useCallback, useState, useEffect, useRef } from "react";
import "@fullcalendar/react/dist/vdom";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { axiosApi } from "@/lib/axios";
import FullCalendar, { DateSelectArg, EventInput } from "@fullcalendar/react";
import Loading from "@/components/parts/Loading";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { useSwipeable } from "react-swipeable";
import useWindowSize from "@/hooks/useWindowSize";

const CurrentDatePage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const thisDate = format(new Date(), "yyyy");

    const calendarRef = useRef<FullCalendar>(null!);
    const [publicTasks, setPublicTasks] = useState<EventInput[]>([]);
    const [sections, setSections] = useState<EventInput[]>([]);
    const [loading, setLoading] = useState(true);
    const [width, height] = useWindowSize();
    const calendarHeight = height - 60;

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
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };

    const handlers = useSwipeable({
        onSwiped: (event) => {
            const calendarApi = calendarRef.current.getApi();
            if (event.dir == "Left") {
                calendarApi.next();
            }
            if (event.dir == "Right") {
                calendarApi.prev();
            }
        },
        trackMouse: true,
    });

    useEffect(() => {
        getPublicTasks();
        getSections();
        setLoading(false);
    }, []);

    const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
        navigate(`/admin/date/${selectInfo.startStr}`);
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }
    return (
        <>
            <div {...handlers} className="frontCalendar">
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
                        start: "",
                        center: "title",
                        // end: "dayGridMonth,timeGridWeek,resourceTimeGridDay",
                        end: "",
                        // end: "prev,next",
                    }}
                    height={calendarHeight}
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
                    select={handleDateSelect}
                />
            </div>
        </>
    );
};

export default CurrentDatePage;
