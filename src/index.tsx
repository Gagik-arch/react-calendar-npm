import ReactDOM from 'react-dom/client';
import Calendar from './Calendar'
import './index.css'
import C from './calendar/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <div onClick={() => {
    const a = new C(new Date('2022, 08, 1'));
    console.log(a)
  }}>click</div>
  // <Calendar calendarCounts={1}

  // />
);

