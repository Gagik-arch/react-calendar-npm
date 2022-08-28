import { IDay } from "calendar-npm";
export interface INavigationRender {
    selectedDate: Date;
    currentDate: Date;
    months: string[];
    weekDays: string[];
    events: Events;
}
export interface IDayRender extends IDay {
    onClick(): void;
    defaultStyles: string;
    key: number;
}
export interface Events {
    toNextMonth: () => void;
    toPrevMonth: () => void;
    toNextYear: () => void;
    toPrevYear: () => void;
    toDate: (date: Date) => void;
}
