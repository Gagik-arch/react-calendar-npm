export interface IDay {
    date: Date;
    label: number | string;
    status: string;
}

export interface ICalendar {
    currentDate: Date;
    selectedDate: Date;
    days: IDay[];
    months: string[];
    weekDays: string[];
    range: Date[];
    toNextMonth(): void;
    toPrevMonth(): void;
    toNextYear(): void;
    toPrevYear(): void;
    toDate(date: Date, selectedRange?: Date): void;
}
