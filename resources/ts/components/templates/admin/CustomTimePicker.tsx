import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Path, Control, Controller } from "react-hook-form";
import ja from "date-fns/locale/ja";
import { Form } from "@/types/PublicTask";

type Props = {
    label: string;
    mr: number;
    valueName: Path<Form>;
    control: Control<Form>;
    required: boolean;
};

const CustomTimePicker: React.FC<Props> = (props) => {
    return (
        <Controller
            control={props.control}
            name={props.valueName}
            defaultValue={""}
            rules={{ required: { value: true, message: "入力必須です。" } }}
            render={({ field, fieldState }) => (
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ja}
                >
                    <TimePicker
                        {...field}
                        label={props.label}
                        minutesStep={10}
                        // ampm={false}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                                inputProps={{
                                    ...params.inputProps,
                                    placeholder: "00:00", //プレースホルダー（フォーカスを合わせたときに薄く表示される入力例）
                                }}
                                required
                                variant="standard"
                                sx={{ mr: props.mr }}
                            />
                        )}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default CustomTimePicker;
