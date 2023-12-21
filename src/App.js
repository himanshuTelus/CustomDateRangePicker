import logo from './logo.svg';
import './App.css';
import NewDateRangePicker from '../src/component/NewDateRangePicker';
import moment, { months } from 'moment';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';


export const dynamicCalendarRange = (calendarExpiration) => {
  return [
    {
      label: 'Today',
      value: [new Date(), new Date()],
      placement: 'left',
    },
    {
      label: 'Yesterday',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: 'left',
    },
    {
      label: `Last ${calendarExpiration} Days`,
      value: [subDays(new Date(), calendarExpiration - 1), new Date()],
      placement: 'left',
    },
  ];
};

function App() {

  const dateChangeHandler = (startDate, endDate) => {
    console.log(startDate, endDate);
    // handleDateRange({ startDate, endDate });
    // fetchData({ startDate, endDate });
  };

  return (
    <div className="App">
       <NewDateRangePicker
              startDate={moment()}
              endDate={moment()}
              maxDate={moment()}
              minDate={moment().subtract(Number(30), 'days')}
              dateChangeHandler={dateChangeHandler}
              ranges={dynamicCalendarRange(Number(30))}
              key={moment()}
            />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
