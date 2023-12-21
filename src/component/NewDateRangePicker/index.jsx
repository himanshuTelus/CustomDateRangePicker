import { DateRangePicker } from 'rsuite';
import './index.css';
import useNewDateRangePicker from './useNewDateRangePicker';
import moment from 'moment';
// import { CalendarIcon } from '';
import { range } from 'lodash';
// import logo from '../scr/logo';

const NewDateRangePicker = (props) => {
  const {
    state,
    handleOnOpenCalendar,
    rangePickerRef,
    handleDateRangeChange,
    handleApply,
    disabledDate,
  } = useNewDateRangePicker(props);

  const { isCalendarOpen, endDate, startDate } = state;
  const {
    isDisabled,
    format = 'MMM-DD-YYYY',
    placeholder = 'Select Range',
    ranges,
    placement = 'bottomEnd',
  } = props;

  let value = `${moment(startDate).format(format)} - ${moment(endDate).format(
    format,
  )}`;

  console.log(props);

  return (
    <>
      <div className="w-100 input-wrapper">
        <input
          id='date-range-input'
          data-testid="date-range-input"
          ref={rangePickerRef}
          src=''
          type="text"
          disabled={!!isDisabled}
          className={`border-right-0 date-range-input ${isCalendarOpen ? 'active' : ''}`}
          value={value}
          name="daterange"
          placeholder={placeholder}
          readOnly
          onClick={handleOnOpenCalendar}
        />
        <div className='icon-wrapper'>
          {/* <CalendarIcon /> */}
        </div>
      </div>
      {isCalendarOpen ? (
        <DateRangePicker
          ranges={ranges}
          open={isCalendarOpen}
          placeholder="Select Range"
          placement={placement}
          onChange={handleDateRangeChange}
          value={[
            new Date(startDate.format('YYYY-MM-DD')),
            new Date(endDate.format('YYYY-MM-DD')),
          ]}
          onOk={handleApply}
          shouldDisableDate={disabledDate}
        />
      ) : null}
    </>
  );
};

export default NewDateRangePicker;
