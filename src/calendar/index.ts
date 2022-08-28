import { IDay, ICalendar } from "./interfaces";

class Calendar implements ICalendar {
    public weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    public months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    public currentDate: Date;
    public days: IDay[];
    public selectedDate: Date;
    public range: Date[] = [];
    private _counter: number = 0;

    constructor(date: Date = new Date()) {
        this.currentDate = new Date();
        this.selectedDate = new Date(date.setHours(0, 0, 0, 0));
        this.days = this.initCalendar(this.currentDate);
    }

    initCalendar(date: Date) {
        const year: number = date.getFullYear();
        const month: number = date.getMonth();

        const _firstDayOfWeek: number = this.getFirstDayOfWeek(month + 1, year);
        const _currentMonthDayCount: number = this.daysInMonth(month + 1, year);
        const _prevMonthDayCount: number = this.daysInMonth(month, year);
        const array: IDay[] = [];
        // console.log(this);

        if (_firstDayOfWeek > 0) {
            let p = _prevMonthDayCount - _firstDayOfWeek + 1,
                c = 1;
            while (p <= _prevMonthDayCount) {
                array.push(
                    new Day(new Date(year, month - 1, p), p, "prev-month")
                );
                p++;
            }
            while (c <= _currentMonthDayCount) {
                array.push(
                    new Day(
                        new Date(year, month, c),
                        c,
                        this.compareTwoDates(
                            this.selectedDate,
                            new Date(year, month, c)
                        )
                            ? "selected-day"
                            : "current-month"
                    )
                );
                c++;
            }
        } else {
            let i = 1;
            while (i <= _currentMonthDayCount) {
                array.push(
                    new Day(
                        new Date(year, month, i),
                        i,
                        this.compareTwoDates(
                            this.selectedDate,
                            new Date(year, month, i)
                        )
                            ? "selected-day"
                            : "current-month"
                    )
                );
                i++;
            }
        }

        const remainder: number = array.length % this.weekDays.length;
        let i: number = 1,
            end: number = 0;

        if (array.length <= 35) {
            // 7 : 5 block
            end = 35 - array.length;
        }
        if (remainder) {
            end = this.weekDays.length - remainder;
        }
        while (i <= end) {
            array.push(new Day(new Date(year, month + 1, i), i, "next-month"));
            i++;
        }
        return array;
    }

    public toDate(date: Date, selectedRange: Date) {
        if (selectedRange) {
            this.createRange(selectedRange);
        }
        this.selectedDate = date;
        this.days = this.initCalendar(this.selectedDate);
    }

    public toNextMonth() {
        this.selectedDate = this.getNextMonth(this.selectedDate);
        this.days = this.initCalendar(this.selectedDate);
    }

    public toPrevMonth() {
        this.selectedDate = this.getPrevMonth(this.selectedDate);
        this.days = this.initCalendar(this.selectedDate);
    }

    public toNextYear() {
        this.selectedDate = this.getNextYear(this.selectedDate);
        this.days = this.initCalendar(this.selectedDate);
    }

    public toPrevYear() {
        this.selectedDate = this.getPrevYear(this.selectedDate);
        this.days = this.initCalendar(this.selectedDate);
    }

    private daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    private getFirstDayOfWeek(month: number, year: number) {
        return new Date(year + "-" + month + "-01").getDay();
    }

    private getPrevMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }

    private getNextMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }

    private getPrevYear(date: Date) {
        return new Date(date.getFullYear() - 1, date.getMonth(), 1);
    }
    private getNextYear(date: Date) {
        return new Date(date.getFullYear() + 1, date.getMonth(), 1);
    }
    private compareTwoDates(date1: Date, date2: Date) {
        return date1.getTime() === date2.getTime();
    }

    private createRange(selectedRange: Date) {
        this.range = [this.selectedDate];
        if (this._counter % 2 === 0) {
            this.range.push(selectedRange);
        } else {
            this.range.push(selectedRange);
        }

        this.range = this.range?.sort(
            (a: Date, b: Date) => a.getTime() - b.getTime()
        );
        this._counter++;
    }
}
class Day {
    public date: Date;
    public label: string | number;
    public status: string;

    constructor(date: Date, label: string | number, status: string) {
        this.date = date;
        this.label = label;
        this.status = status;
    }
}

export type { ICalendar, IDay };
export default Calendar;
