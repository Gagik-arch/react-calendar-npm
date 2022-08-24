import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Calendar from './Calendar'
import C, { CalendarI } from './calendar/index'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const c = new C()

root.render(
    // <Calendar />
  <div onClick={() => {
    c.toNextMonth()
    console.log(c)
  }}>
asd
  </div>
);

