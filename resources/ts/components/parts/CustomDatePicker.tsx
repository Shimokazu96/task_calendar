import * as React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";
import { Path, Control, Controller } from "react-hook-form";
import { Form } from "@/types/PublicTask";

type Props = {
    mr: number;
    label: string;
    valueName: Path<Form>;
    control: Control<Form>;
    required: boolean;
    defaultValue: string;
};

const CustomDatePicker: React.FC<Props> = (props) => {
    // const [value, setValue] = React.useState<Date | null>(null);
    // const handleChange = (newValue: Date | null) => {
    //     setValue(newValue);
    // };
    // console.log(value);
    const styles = {
        mobileDialogProps: {
            ".MuiDatePickerToolbar-title": {
                fontSize: "1.5rem",
            },
        },
    };
    return (
        <Controller
            control={props.control}
            name={props.valueName}
            defaultValue={props.defaultValue}
            rules={{ required: { value: true, message: "入力必須です。" } }}
            render={({ field, fieldState }) => (
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ja}
                    dateFormats={{
                        monthAndYear: "yyyy年 MM月",
                        year: "yyyy年",
                    }}
                    localeText={{
                        previousMonth: "前月を表示", // < のツールチップ
                        nextMonth: "次月を表示", // > のツールチップ
                        cancelButtonLabel: "キャンセル", // スマホ画面のCANCELボタン
                        okButtonLabel: "選択", // スマホ画面のOKボタン
                    }}
                >
                    <DatePicker
                        {...field}
                        label={props.label}
                        minDate={new Date()} //過去の日付無効
                        // onChange={handleChange}
                        inputFormat="yyyy年MM月dd日" //選択済みの日付の表示
                        mask="____年__月__日"
                        toolbarFormat="yyyy年MM月dd日" // スマホ画面の左上 選択中日付表示
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                                inputProps={{
                                    ...params.inputProps,
                                    placeholder: "****年**月**日", //プレースホルダー（フォーカスを合わせたときに薄く表示される入力例）
                                }}
                                required
                                sx={{ mr: props.mr }}
                                variant="standard"
                            />
                        )}
                        DialogProps={{ sx: styles.mobileDialogProps }} // スマホ画面の左上 選択中日付表示 文字の大きさ調整
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default CustomDatePicker;
