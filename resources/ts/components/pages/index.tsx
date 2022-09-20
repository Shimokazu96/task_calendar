import { useCallback, useState, useEffect, useRef } from "react";
import "@fullcalendar/react/dist/vdom";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
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
import useWindowSize, { CalendarDifferenceHeight } from "@/hooks/useWindowSize";

const TopPage: React.FC = () => {
    const thisDate = format(new Date(), "yyyy");
    const navigate = useNavigate();
    const calendarRef = useRef<FullCalendar>(null!);
    const [width, height] = useWindowSize();
    const calendarHeight = height - CalendarDifferenceHeight;

    const [publicTasks, setPublicTasks] = useState<EventInput[]>([]);
    const [loading, setLoading] = useState(true);

    const getPublicTasks = async () => {
        await axiosApi
            .get(`/api/public_task/calendar/${thisDate}`)
            .then((response: AxiosResponse) => {
                setPublicTasks(response.data);
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
        setLoading(false);
    }, []);

    const handleDateSelect = (date: Date) => {
        const selectDate = format(date, "yyyy-MM-dd");
        navigate(`/date/${selectDate}`);
    };

    if (loading) {
        return <Loading open={loading} />;
    }
    return (
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
                    start: "title",
                    center: "",
                    // end: "dayGridMonth,timeGridWeek,resourceTimeGridDay",
                    // end: "",
                    end: "today,prev,next",
                }}
                height={calendarHeight}
                eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
                // initialView="resourceTimeGridDay"
                // eventContent={renderEventContent}
                selectable={true}
                editable={false}
                // showNonCurrentDates={false}

                // selectMirror={true}
                dayMaxEvents={true}
                navLinks={true}
                nowIndicator={true}
                events={publicTasks}
                aspectRatio={1}
                locales={allLocales}
                locale="ja"
                navLinkDayClick={handleDateSelect}
                // eventsSet={handleEvents}
                // select={handleDateSelect}
                // eventClick={handleEventClick}
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
