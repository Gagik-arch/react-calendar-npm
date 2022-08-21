import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Calendar from './Calendar'
import C, { CalendarI } from './calendar/index'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const c:CalendarI = new C()

root.render(
    // <Calendar />
  <div onClick={() => {
    console.log(c.toNextMonth())
  }}>
asd
  </div>
);

