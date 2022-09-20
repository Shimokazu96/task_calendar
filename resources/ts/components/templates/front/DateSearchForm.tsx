import * as React from "react";
import {
    Grid,
    Button,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
} from "@mui/material";
import { setYear, setMonth, setDay } from "@/lib/dateFormat";
import { format } from "date-fns";
import { UseFormRegisterReturn } from "react-hook-form";

type Form = {
    year: string;
    month: string;
    day: string;
};

type Props = {
    onSubmit: VoidFunction;
    year: UseFormRegisterReturn;
    month: UseFormRegisterReturn;
    day: UseFormRegisterReturn;
    defaultYear: string;
    defaultMonth: string;
    defaultDay: string;
};

export default function DateSearchForm(props: Props) {
    const thisDate = format(new Date(), "yyyy-MM-dd");
    const thisYear = format(new Date(), "yyyy");
    const thisMonth = format(new Date(), "M");
    const thisDay = format(new Date(), "d");

    return (
        <Grid
            container
            sx={{
                mt: { xs: "12%", md: "64px" },
                width: { xs: "100%", md: "1024px" },
                height: "12%",
                p: 1,
                pt: 3,
                position: "fixed",
                top: 0,
                right: { xs: 0, md: "inherit" },
                zIndex: 1000,
                justifyContent: "space-evenly",
                backgroundColor: "white",
            }}
        >
            <Grid item xs={3} md={4}>
                <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">年</InputLabel>
                    <Select
                        {...props.year}
                        defaultValue={props.defaultYear}
                        label="Age"
                    >
                        {setYear().map((value, index) => (
                            <MenuItem key={index} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2.5} md={2}>
                <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">月</InputLabel>
                    <Select
                        {...props.month}
                        defaultValue={props.defaultMonth}
                        label="Age"
                    >
                        <MenuItem value={""}>　</MenuItem>
                        {setMonth().map((value, index) => (
                            <MenuItem key={index} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2.5} md={2}>
                <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">日</InputLabel>
                    <Select
                        {...props.day}
                        defaultValue={props.defaultDay}
                        label="Age"
                    >
                        <MenuItem value={""}>　</MenuItem>
                        {setDay().map((value, index) => (
                            <MenuItem key={index} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2} md={2}>
                <Button
                    onClick={() => props.onSubmit()}
                    fullWidth
                    variant="contained"
                    size="small"
                    sx={{
                        minWidth: 0,
                        display: "block",
                        height: { xs: "80%", md: "50%" },
                    }}
                >
                    検索
                </Button>
            </Grid>
        </Grid>
    );
}
