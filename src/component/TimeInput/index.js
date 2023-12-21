import React from 'react';
import './style.css';
import TimeField from 'react-simple-timefield';

const TimeInput = ({ label, time, onChange, index }) => {
  return (
    <div className="time-input-wrapper">
      {!!label && <label>{label}:</label>}
      <TimeField
        value={time}
        onChange={(e, startTime) => onChange(e, startTime, index)}
      />
    </div>
  );
};
export default TimeInput;
