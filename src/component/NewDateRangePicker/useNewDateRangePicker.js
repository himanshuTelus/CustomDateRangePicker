import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import TimePickerSection from './TimePickerSection';
import ReactDOM from 'react-dom';


const initialState = {
  startDate: moment().startOf('month'),
  endDate: moment(),
  startTime: moment().startOf('day').format('HH:mm'),
  endTime: moment().endOf('day').format('HH:mm'),
  isCalendarOpen: false,
};

const useNewDateRangePicker = ({
  isTimeInputEnabled,
  startDate,
  endDate,
  maxDate,
  minDate,
  dateChangeHandler,
  isCalledFromFilter
}) => {
  const [state, setState] = useState(initialState);
  const rangePickerRef = useRef(null);

  const { isCalendarOpen } = state;

  const updateState = useCallback((request) => {
    if (Array.isArray(request)) {
      request.forEach(({ key, value }) => {
        setState((prevState) => ({ ...prevState, [key]: value }));
      });
    } else {
      const { key, value } = request;
      setState((prevState) => ({ ...prevState, [key]: value }));
    }
  }, []);

  const handleDateRangeChange = ([start, end]) => {
    updateState([
      {
        key: 'startDate',
        value: moment(start),
      },
      {
        key: 'endDate',
        value: moment(end),
      },
    ]);

    !!dateChangeHandler && dateChangeHandler(moment(start), moment(end));
  };

  const disabledDate = (date) => {
    // Disable dates before '2023-01-01' and after '2023-12-31'
    return date < new Date(minDate) || date > new Date(maxDate);
  };

  const handleApply = ([start, end]) => {
    updateState([
      {
        key: 'startDate',
        value: moment(start),
      },
      {
        key: 'endDate',
        value: moment(end),
      },
    ]);

    setState((prevState) => ({
      ...prevState,
      isCalendarOpen: !prevState.isCalendarOpen,
    }));

    !!dateChangeHandler && dateChangeHandler(moment(start), moment(end));
  };

  const renderTimePicker = useCallback(() => {
    const rsPickerToolbar = document.getElementById('timepickercontainer');
    if (rsPickerToolbar) {
      ReactDOM.render(
        <TimePickerSection
          startTime={moment().format('HH:mm')}
          endTime={moment().format('HH:mm')}
          onChange={() => {}}
        />,
        rsPickerToolbar,
      );
    }
  }, []);

  const handleOnOpenCalendar = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isCalendarOpen: !prevState.isCalendarOpen,
    }));
  }, []);

  useEffect(() => {
    if (isCalendarOpen) {
      // Logic to append time field with calendar
      const rsPickerToolbar = document.querySelector('.rs-picker-toolbar');
      const timePickerContainer = document.createElement('div');
      timePickerContainer.setAttribute('id', 'timepickercontainer');
      timePickerContainer.setAttribute('class', 'time-picker-container');
      if (isTimeInputEnabled) {
        if (!document.getElementById('timepickercontainer')) {
          rsPickerToolbar?.prepend(timePickerContainer);
          renderTimePicker();
        }
      }

      //Button Text change
      const rsPickerToolbarRight = document.querySelector(
        '.rs-picker-toolbar-right',
      );
      const rsPickerToolbarBtn =
        rsPickerToolbarRight.getElementsByTagName('button');
      if (!!rsPickerToolbarBtn[0]) {
        rsPickerToolbarBtn[0].innerText = 'APPLY';
      }
    }
  }, [isCalendarOpen, isTimeInputEnabled, renderTimePicker]);

  useEffect(() => {
    if (!!startDate && !!endDate) {
      updateState([
        {
          key: 'startDate',
          value: moment(startDate),
        },
        {
          key: 'endDate',
          value: moment(endDate),
        },
        {
          key: 'startTime',
          value: moment(startDate).format('HH:mm'),
        },
        {
          key: 'endTime',
          value: moment(endDate).format('HH:mm'),
        },
      ]);
    }
  }, [startDate, endDate, updateState]);

useEffect(() => {
  if (isCalendarOpen && isCalledFromFilter){
    const calendarModal = document.querySelector('.rs-picker-daterange-menu');
    const calendarInputModal = document.querySelector('.date-range-picker-wrapper');
    const inputField = document.getElementById('date-range-input');
    if (!!calendarModal && !!calendarInputModal && !!inputField){
      calendarModal.style.zIndex = 9999;
    }
  }
}, [isCalledFromFilter, isCalendarOpen]);

  return {
    state,
    rangePickerRef,
    disabledDate,
    updateState,
    handleOnOpenCalendar,
    handleDateRangeChange,
    handleApply,
  };
};

export default useNewDateRangePicker;
