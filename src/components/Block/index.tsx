import {FC,useState,ReactNode} from "react";
import { IDayRender, INavigationRender } from '../../interfaces'
import {ICalendar  } from 'calendar-npm'
import { Icon } from "../../core";
import { Days } from '../../components'

 interface IProps {
    calendar: ICalendar;
    onChange?: Function;
    index: number;
    renderWeekDays?(options:string[]): ReactNode ;
    renderNavigation?(options:INavigationRender): React.ReactNode;
    renderDays?(options:IDayRender): React.ReactNode;
    calendarCounts: number;
    disablePrevNextDates: boolean;
    range?: boolean;
    calendars:ICalendar[]
}

export const Block: FC<IProps> = ({
    onChange,
    calendar,
    index,
    renderWeekDays,
    renderNavigation,
    renderDays,
    calendarCounts,
    disablePrevNextDates,
    range=false,
}) => {
    const [rerender, setRerender] = useState<boolean>(false);

    const onChangeCalendar = () => {
        onChange && onChange();
        setRerender(!rerender);
    };

    return (
        <div >
           {renderNavigation ? (
               renderNavigation({
                   selectedDate: calendar?.selectedDate,
                   currentDate: calendar.currentDate,
                   months: calendar.months,
                   weekDays: calendar.weekDays,
                   events: {
                       toNextMonth: () => {
                           calendar.toNextMonth()
                           setRerender(!rerender)
                       },
                       toPrevMonth: () => {
                           calendar.toPrevMonth()
                           setRerender(!rerender)
                       },
                       toNextYear: () => {
                           calendar.toNextYear()
                           setRerender(!rerender)
                       },
                       toPrevYear: () => {
                           calendar.toPrevYear()
                           setRerender(!rerender)
                       },
                       toDate: (date:Date) => calendar.toDate(date),
                   },
               })
           ) : (
               <div className={'navigation'}>
                   <button
                       onClick={() => {
                           calendar?.toPrevYear();
                           onChangeCalendar();
                       }}
                   >
                       <Icon type={"ChevronsLeft"} />
                   </button>
                   <button
                       onClick={() => {
                            calendar?.toPrevMonth();
                            onChangeCalendar();
                        }}
                    >
                            <Icon type={"ChevronLeft"} />
                    </button>
                    {calendar?.selectedDate?.toString().split(" ")[3] +
                        "  " +
                        calendar?.selectedDate?.toString().split(" ")[1]}
                    <button
                        onClick={() => {
                            calendar?.toNextMonth();
                            onChangeCalendar();
                        }}
                    >
                        <Icon type={"ChevronRight"}  />
                    </button>
                    <button
                        onClick={() => {
                            calendar?.toNextYear();
                            onChangeCalendar();
                        }}
                    >
                        <Icon type={"ChevronsRight"} />
                    </button>
                </div>
            )}
            {renderWeekDays ? (
                renderWeekDays(calendar.weekDays)
            ) : (
                <div className={'weeks'}>
                    {calendar?.weekDays?.map((day, i) => {
                        return (
                            <div key={i} className={['weekday'].join(" ")}>
                                {day.substring(0, 1)}
                            </div>
                        );
                    })}
                </div>
            )}
       {
              
                    <Days calendar={calendar}
                        range={range}
                        calendarCounts={calendarCounts}
                        index={index}
                        onChange={onChangeCalendar}
                        disablePrevNextDates={disablePrevNextDates}
                        renderDays={ renderDays}
                    />
            }
        </div>
    );
};