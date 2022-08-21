import {FC,useState} from "react";
import s from './block.module.css'
import { CalendarI } from "calendar-npm";
import { NavigationRenderI } from '../../interfaces'
import { Icon } from "../../core";

export interface IProps {
    calendar: CalendarI;
    onChange?: Function;
    index: number;
    renderWeekDays: () => void
    // renderNavigation: (object:NavigationRenderI) => JSX.Element;
    // renderDays: () => JSX.Element;
    calendarCounts: number;
    disablePrevNextDates: boolean;
    range?: Date[];
    calendars:CalendarI[]
}

export const Block: FC<IProps> = ({
    onChange,
    calendar,
    index,
    renderWeekDays,
    // renderNavigation,
    // renderDays,
    calendarCounts,
    disablePrevNextDates,
    range,
}) => {
    const [rerender, setRerender] = useState<boolean>(false);

    const onChangeCalendar = () => {
        onChange && onChange();
        setRerender(!rerender);
    };

    return (
        <div>
           {/* {renderNavigation ? (
               renderNavigation({
                   selectedDate: calendar?.selectedDate,
                   currentDate: calendar.currentDate,
                   months: calendar.months,
                   weekDays: calendar.weekDays,
                   events: {
                       toNextMonth: () => calendar.toNextMonth(),
                       toPrevMonth: () => calendar.toPrevMonth(),
                       toNextYear: () => calendar.toNextYear(),
                       toPrevYear: () => calendar.toPrevYear(),
                       toDate: (date:Date) => calendar.toDate(date),
                   },
               })
           ) : (
               <div className={s.navigation}>
                   <button
                       onClick={() => {
                        //    calendar?.toPrevYear();
                           onChangeCalendar();
                       }}
                   >
                       <Icon type={"ChevronsLeft"} />
                   </button>
                   <button
                       onClick={() => {
                            // calendar?.toPrevMonth();
                            onChangeCalendar();
                        }}
                    >
                        <Icon type={"ChevronLeft"} />
                    </button>
                    {calendar?.selectedDate?.toString().split(" ")[3] +
                        " : " +
                        calendar?.selectedDate?.toString().split(" ")[1]}
                    <button
                        onClick={() => {
                            // calendar?.toNextMonth();
                            onChangeCalendar();
                        }}
                    >
                        <Icon type={"ChevronRight"}  />
                    </button>
                    <button
                        onClick={() => {
                            // calendar?.toNextYear();
                            onChangeCalendar();
                        }}
                    >
                        <Icon type={"ChevronsRight"} />
                    </button>
                </div>
            )}
            {renderWeekDays ? (
               renderWeekDays()// renderWeekDays(calendar.weekDays)
            ) : (
                <div className={s.weeks}>
                    {calendar?.weekDays?.map((day, i) => {
                        return (
                            <div key={i} className={[s.weekday].join(" ")}>
                                {day.substring(0, 1)}
                            </div>
                        );
                    })}
                </div>
            )} */}
            {/* {
                <Days
                    calendar={calendar}
                    range={range}
                    calendarCounts={calendarCounts}
                    renderDays={renderDays}
                    index={index}
                    onChange={onChangeCalendar}
                    disablePrevNextDates={disablePrevNextDates}
                />
            } */}
        </div>
    );
};