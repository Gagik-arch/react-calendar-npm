# Maintainers Wanted

This project is intended to be consumed for React project based on calendar-npm package.
It is easy customizable

[![Build Status](https://github.com/Gagik-arch/react-calendar-npm)](https://github.com/Gagik-arch/react-calendar-npm)
[![npm version](https://github.com/Gagik-arch/react-calendar-npm)](https://github.com/Gagik-arch/react-calendar-npm)

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Note](#note)
-   [Built With](#built-with)
-   [Author](#author)

## Installation

```sh
$ npm install react-calendar-npm
```

## Usage

```js
import Calendar from "react-calendar-npm";

<Calendar
    onChange={(e) => {}} // returned date when calendar state is changed
    date={new Date()} // initial date
    containerClassName={className} // className for calendar container
    renderWeekDays={JSX} // override default styles for weekdays
    renderNavigation={JSX} // override default styles for navigation
    renderDays={JSX} // override default styles for days
    calendarCounts={1} // calendar count for render
    range={false} // range for calendar two dates
    disablePrevNextDates={true} //  disable or enable calendar previous and next month button events
/>;
```

## Note

Documentation commeing soon

## Built With

-   Gagik Chilingaryan (Gagik-arch)

## Author

-   **Gagik** - _Initial work_ - [gagik-arch](https://github.com/Gagik-arch/react-calendar-npm)
