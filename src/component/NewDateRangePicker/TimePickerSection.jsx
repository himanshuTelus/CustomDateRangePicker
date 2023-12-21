import React from 'react';
import './index.css';
import TimeInput from '../../component/TimeInput';

const TimePickerSection = ({
  startTime,
  endTime,
  onChange,
  singleTimePicker,
}) =>
  !singleTimePicker ? (
    <div className="time-section-wrapper">
      <TimeInput
        label="From"
        time={startTime}
        onChange={(e, selectedStartTime) =>
          onChange('startTime', e, selectedStartTime)
        }
      />
      <TimeInput
        label="To"
        time={endTime}
        onChange={(e, selectedEndTime) =>
          onChange('endTime', e, selectedEndTime + ':59')
        }
      />
    </div>
  ) : (
    <TimeInput
      label="Start Time"
      time={startTime}
      onChange={(e, selectedStartTime) =>
        onChange('startTime', e, selectedStartTime)
      }
    />
  );
export default TimePickerSection;
