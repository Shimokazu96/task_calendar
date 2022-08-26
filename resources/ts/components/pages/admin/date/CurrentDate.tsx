import { useCallback, useState, useEffect, useRef } from "react";
import "@fullcalendar/react/dist/vdom";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { axiosApi } from "@/lib/axios";
import FullCalendar, {
    DateSelectArg,
    EventInput,
} from "@fullcalendar/react";
import Dashboard from "@/components/templates/admin/Dashboard";
import Loading from "@/components/parts/Loading";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

const CurrentDatePage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams(); // URLのパスパラメータを取得。例えば、 /uses/2 なら、2の部分を取得
    const thisDate = format(new Date(), "yyyy");

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
    console.log(calendarRef.current);

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
                        end: "prev,next Month",
                    }}
                    height={"88vh"}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                    slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
                    initialView="resourceTimeGridDay"
                    initialDate={params.date}
                    droppable={false}
                    customButtons={{
                        Month: {
                            text: "月",
                            click: () => {
                                navigate(`/admin`);
                            },
                        },
                    }}
                    dayMaxEvents={true}
                    nowIndicator={true}
                    resources={[
                        { id: "1", title: "フロント", eventColor: "#5aa7de" },
                        { id: "2", title: "厨房", eventColor: "#61dd56" },
                    ]}
                    events={publicTasks}
                    aspectRatio={1.5}
                    locales={allLocales}
                    locale="ja"
                    select={handleDateSelect}
                />
            </div>
        </Dashboard>
    );
};

export default CurrentDatePage;
