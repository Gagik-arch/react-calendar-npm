import { useState, useMemo, useLayoutEffect, FC } from "react";
import s from "./calendar.module.css";
import { Icon } from "./core";
import { Block } from "./components";
import C, { CalendarI } from './calendar/index'
import { NavigationRenderI} from './interfaces'


interface IProps {
    date?: Date;
    onChange?: Function;
    containerClassName?: string;
    renderWeekDays(): JSX.Element | HTMLElement;
    renderNavigation(object:NavigationRenderI): JSX.Element | HTMLElement;
    renderDays(): JSX.Element | HTMLElement;
    calendarCounts?: number;
    range?: Date[];
    disablePrevNextDates?: boolean;
}

const Calendar: FC<IProps> = ({
    onChange = () => {},
    date: date = new Date(),
    containerClassName = "",
    renderWeekDays = ()=>{ },
    // renderNavigation,
    // renderDays,
    calendarCounts = 1,
    range = false,
    disablePrevNextDates = true,
}): JSX.Element => {
    const calendars: CalendarI[] = useMemo(() => {
        const now: Date = new Date(date);

        return Array.from({ length: calendarCounts }, (_, k) => {
            const _dates: Date = new Date(
                now.getFullYear(),
                now.getMonth() + k,
                now.getDate()
            );
            return new C(_dates);
        });
    }, []);

    useLayoutEffect(() => {
        onChange(calendars.map((e) => e.selectedDate));
    }, []);

    const onChangeCalendar: CallableFunction = (): void => {
        onChange(calendars.map((e) => e.selectedDate));
    };

    return (
        <div
            className={[s.container, containerClassName].join(" ")}
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
                        // renderNavigation={renderNavigation}
                        // renderDays={renderDays}
                        calendarCounts={calendarCounts}
                        // range={range}
                        disablePrevNextDates={disablePrevNextDates}
                    />
                );
            })}
        </div>
    );
};





// const Days = ({
//     calendar,
//     range,
//     calendarCounts,
//     index,
//     onChange,
//     disablePrevNextDates,
//     renderDays,
// }) => {
//     return (
//         <div className={s.body}>
//             {calendar?.days?.map((day, i) => {
//                 if (renderDays) {
//                     return renderDays({
//                         day,
//                         index: i,
//                         defaultStyles: [
//                             s.day,
//                             s[day.status],
//                             range &&
//                             calendarCounts === 2 &&
//                             day.status === "selected-day"
//                                 ? s[`selected_day_${index + 1}`]
//                                 : "",
//                             range && calendarCounts <= 2
//                                 ? rangeSelectionLogic(
//                                       index,
//                                       day.date,
//                                       calendar,
//                                       calendarCounts
//                                   )
//                                 : "",
//                             range && calendarCounts <= 2
//                                 ? rangeSelectionStyles(calendar, day)
//                                 : "",
//                         ],
//                         onClickDay: () => {
//                             calendar.toDate(
//                                 day.date,
//                                 range && calendarCounts === 1 && day.date
//                             );
//                             onChange();
//                         },
//                     });
//                 }
//                 return (
//                     <button
//                         key={i}
//                         disabled={
//                             disablePrevNextDates &&
//                             day.status !== "selected-day" &&
//                             day.status !== "current-month"
//                         }
//                         data-index={i}
//                         className={[
//                             s.day,
//                             s[day.status],
//                             range &&
//                                 calendarCounts === 2 &&
//                                 s[
//                                     day.status === "selected-day" &&
//                                         `selected_day_${index + 1}`
//                                 ],
//                             range &&
//                                 calendarCounts <= 2 &&
//                                 rangeSelectionLogic(
//                                     index,
//                                     day.date,
//                                     calendar,
//                                     calendarCounts
//                                 ),
//                             range &&
//                                 calendarCounts <= 2 &&
//                                 rangeSelectionStyles(calendar, day),
//                         ].join(" ")}
//                         onClick={() => {
//                             calendar.toDate(
//                                 day.date,
//                                 calendarCounts === 1 && day.date
//                             );
//                             onChange();
//                         }}
//                     >
//                         {day.label}
//                     </button>
//                 );
//             })}
//         </div>
//     );
// };
// const rangeSelectionLogic = (index, dayDate, calendar, calendarCounts) => {
//     if (calendarCounts > 1) {
//         if (index === 0) {
//             return dayDate.getTime() > calendar.selectedDate.getTime()
//                 ? s["selected-range"]
//                 : "";
//         } else if (index === calendarCounts - 1) {
//             return dayDate.getTime() < calendar.selectedDate.getTime()
//                 ? s["selected-range"]
//                 : "";
//         }
//         return;
//     }
//     if (calendar.hasOwnProperty("range")) {
//         if (
//             dayDate.getTime() >= calendar.range[0].getTime() &&
//             dayDate.getTime() <= calendar.range[1].getTime()
//         ) {
//             return s["selected-range"];
//         }
//     }
// };

// const rangeSelectionStyles = (calendar, day) => {
//     return (
//         calendar.hasOwnProperty("range") &&
//         (calendar?.range[0].getTime() !== calendar?.range[1].getTime() &&
//         calendar?.range[0].getTime() === day.date.getTime()
//             ? s["selected_day_1"]
//             : calendar?.range[0].getTime() !== calendar?.range[1].getTime() &&
//               calendar?.range[1].getTime() === day.date.getTime()
//             ? s["selected_day_2"]
//             : calendar?.range[0].getTime() === calendar?.range[1].getTime()
//             ? s[".selected-day"]
//             : "")
//     );
//};
// export default Calendar;
