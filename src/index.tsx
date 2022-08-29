import React,{ ReactNode, useMemo, useLayoutEffect, FC } from "react";
import  "./index.css";
import { Block } from "./components";
import C,{ ICalendar } from "calendar-npm";
import { IDayRender, INavigationRender } from './interfaces'

interface IProps {
    date?: Date;
    onChange?: Function;
    containerClassName?: string;
    renderWeekDays?():ReactNode ;
    renderNavigation?(options:INavigationRender): ReactNode;
    renderDays?(options:IDayRender):ReactNode;
    calendarCounts?: number;
    range?: boolean;
    disablePrevNextDates?: boolean;
}

const Calendar: FC<IProps> = ({
    onChange = () => {},
    date: date = new Date(),
    containerClassName = "",
    renderWeekDays ,
    renderNavigation,
    renderDays,
    calendarCounts = 1,
    range = false,
    disablePrevNextDates = true,
}): JSX.Element => {
    const calendars: ICalendar[] = useMemo(() => {
        const now: Date = new Date(date);

        return Array.from({ length: calendarCounts }, (_, k) => {
            const _dates: Date = new Date(
                now.getFullYear(),
                now.getMonth() +k,
                now.getDate()
            );
            return new C(_dates);
        });
    }, [calendarCounts,date]);

    useLayoutEffect(() => {
        onChange(calendars.map((e) => e.selectedDate));
    }, []);

    const onChangeCalendar: CallableFunction = (): void => {
        onChange(calendars.map((e) => e.selectedDate));
    };

    return (
        <div
            className={['container', containerClassName].join(" ")}
            style={{
                gridTemplateColumns: `repeat(${calendarCounts}, auto)`,
            }}
        >
            {calendars?.map((calendar, index) => {
                return (
                    <Block
                        key={index}
                        index={index}
                        onChange={onChangeCalendar}
                        calendars={calendars}
                        calendar={calendar}
                        renderWeekDays={renderWeekDays}
                        renderNavigation={renderNavigation}
                        renderDays={renderDays}
                        calendarCounts={calendarCounts}
                        range={range}
                        disablePrevNextDates={disablePrevNextDates}
                    />
                );
            })}
        </div>
    );
};

export default Calendar