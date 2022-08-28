import { FC,ReactNode } from 'react'
import { ICalendar,IDay } from 'calendar-npm';
import { IDayRender } from '../../interfaces';

 interface IProps {
    calendar: ICalendar;
    onChange?: Function;
    index: number;
    renderDays?(options:IDayRender): ReactNode;
    calendarCounts: number;
    disablePrevNextDates: boolean;
    range?: boolean;
}

export const Days: FC<IProps> = ({ calendar,
    range,
    calendarCounts,
    index,
    onChange,
    disablePrevNextDates,
    renderDays
}) => {
    const onClick = (day: IDay) => {
                   calendar.toDate(day.date, calendarCounts === 1 ? day.date :undefined)
                                onChange && onChange()
    }
    return (
        <div className={'days'}
        >
            {
                calendar?.days?.map((day, i) => {
                    if (renderDays) { 
                        return renderDays( {
                            ...day,
                            onClick: () => onClick(day),
                            key:day.date.getTime(),
                            defaultStyles: ['day',
                            day.status,
                            range && calendarCounts > 1 ? day.status === 'selected-day' ? `selected_day_${index + 1}` : '' : '',
                            range ? rangeSelectionLogic(index, day.date, calendar, calendarCounts) : '',
                            range ? rangeSelectedRangeStyles(calendar, day) : ''
                            ].join(' ')
                        })
                    }
                    return (
                        <button key={i}
                            disabled={disablePrevNextDates &&
                                (day.status !== 'selected-day' && day.status !== 'current-month')
                            }
                            data-index={i}
                            className={['day',
                                day.status,
                            range && calendarCounts > 1 ? day.status === 'selected-day' ? `selected_day_${index + 1}` : '' : '',
                            range  ? rangeSelectionLogic(index, day.date, calendar, calendarCounts) : '',
                                range ? rangeSelectedRangeStyles(calendar, day) : '',
                            calendar.currentDate.setHours(0, 0, 0, 0) === day.date.getTime() ? 'nowDay' : '',

                            ].join(' ')}
                            onClick={()=>onClick(day)}
                        >
                            {day.label}
                        </button>
                    )
                })
            }
        </div>
    )
}
const rangeSelectionLogic = (index:number, dayDate:Date, calendar:ICalendar, calendarCounts:number) => {
    if (calendarCounts > 1) {
        if (index === 0) {
            return dayDate.getTime() > calendar.selectedDate.getTime() ?
                'selected-range' : ''
        } else if (index === calendarCounts - 1) {
            return (dayDate.getTime() < calendar.selectedDate.getTime() ?
                'selected-range' :
                '')
        }
        return
    }
    if (calendar.hasOwnProperty('range') && calendar.range.length > 0) {
        if (dayDate?.getTime() >= calendar.range[0]?.getTime() &&
            dayDate?.getTime() <= calendar.range[1]?.getTime()
        ) {
            return 'selected-range'
        }
    }
}

const rangeSelectedRangeStyles = (calendar: ICalendar, day: IDay) => {
    return (calendar.hasOwnProperty('range') &&
        (calendar?.range[0]?.getTime() !== calendar?.range[1]?.getTime() && calendar?.range[0]?.getTime() === day.date?.getTime() ? 'selected_day_1' :
            calendar?.range[0]?.getTime() !== calendar?.range[1]?.getTime() && calendar?.range[1]?.getTime() === day.date?.getTime() ? 'selected_day_2' :
                calendar?.range[0]?.getTime() === calendar?.range[1]?.getTime() ? '.selected-day'
                    : ''))
}