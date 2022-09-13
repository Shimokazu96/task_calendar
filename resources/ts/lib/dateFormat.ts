import { getDate, getMonth, getYear, format, parse } from "date-fns";

export const setYear = () => {
    const year = Array();
    const date = new Date();
    const thisYear = getYear(date);
    for (let i = 1920; i <= thisYear + 100; i++) {
        year.push(i);
    }
    return year;
};
export const setMonth = () => {
    const month = Array();

    for (let i = 1; i <= 12; i++) {
        month.push(i);
    }
    return month;
};
export const setDay = () => {
    const day = Array();

    for (let i = 1; i <= 31; i++) {
        day.push(i);
    }
    return day;
};
export const isInvalidDate = (date: Date) => Number.isNaN(date.getTime());

export const searchDate = (
    year: string,
    month: string | null,
    day: string | null
): string => {
    let searchDate = "";
    if (year && month && day) {
        if (
            isInvalidDate(
                parse(year + "-" + month + "-" + day, "yyyy-MM-dd", new Date())
            )
        ) {
            return "Invalid_Date";
        }
        let inputDate = parse(
            year + "-" + month + "-" + day,
            "yyyy-MM-dd",
            new Date()
        );
        searchDate =
            format(inputDate, "yyyy") +
            "-" +
            format(inputDate, "MM") +
            "-" +
            format(inputDate, "dd");
    }
    if (!month && !day) {
        let inputDate = parse(year, "yyyy", new Date());
        searchDate = format(inputDate, "yyyy");
    }
    if (year && month && !day) {
        let inputDate = parse(year + "-" + month, "yyyy-MM", new Date());
        searchDate = format(inputDate, "yyyy") + "-" + format(inputDate, "MM");
    }
    return searchDate;
};
