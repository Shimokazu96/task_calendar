import { getDate, getMonth, getYear, format } from "date-fns";

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
