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
            .get(`/api/admin/public_task/calendar/${thisDate}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTasks(response.data);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };
    const getSections = async () => {
        await axiosApi
            .get(`/api/admin/time_grid/section`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setSections(response.data);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };

    useEffect(() => {
        getPublicTasks();
        getSections();
        setLoading(false);
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
            <div className="adminCalendar">
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
            <Link to={`/admin/public_task/create?date=${params.date}`}>
                <Tooltip placement="top" title="公開タスクを追加">
                    <Button
                        variant="contained"
                        color="primary"
                        role="presentation"
                        sx={{
                            position: "fixed",
                            bottom: 50,
                            right: 30,
                            zIndex: 1000,
                        }}
                    >
                        <AddIcon color="inherit" fontSize="large"></AddIcon>
                    </Button>
                </Tooltip>
            </Link>
        </>
    );
};

export default CurrentDatePage;