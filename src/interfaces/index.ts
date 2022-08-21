export interface NavigationRenderI {
    selectedDate: Date;
    currentDate: Date;
    months: string[];
    weekDays: string[];
    events: {
        toNextMonth: () => () => void;
        toPrevMonth: () => () => void;
        toNextYear: () => () => void;
        toPrevYear: () => () => void;
        toDate: (date: Date) => (date: Date) => void;
    };
}
