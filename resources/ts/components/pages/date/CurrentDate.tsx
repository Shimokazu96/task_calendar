import { useCallback, useState, useEffect, useRef } from "react";
import "@fullcalendar/react/dist/vdom";
import { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSwipeable } from "react-swipeable";

const CurrentDatePage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const thisDate = format(new Date(), "yyyy");

    const calendarRef = useRef<FullCalendar>(null!);
    const [publicTasks, setPublicTasks] = useState<EventInput[]>([]);
    const [sections, setSections] = useState<EventInput[]>([]);
    const [loading, setLoading] = useState(true);

    const getPublicTasks = async () => {
        await axiosApi
            .get(`/api/public_task/calendar/${thisDate}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTasks(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };
    const getSections = async () => {
        await axiosApi
            .get(`/api/time_grid/section`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setSections(response.data);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };

    const handlers = useSwipeable({
        onSwiped: (event) => {
            console.log(event);
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
    }, []);
    console.log(calendarRef.current);

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
                    height={"88vh"}
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
