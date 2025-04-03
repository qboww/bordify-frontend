import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInputCalendar from './CustomInputCalendar';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';

const CusDatePicker = ({ selectedDeadline, control, name, ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ReactDatePicker
          selected={selectedDeadline ? new Date(selectedDeadline) : startDate}
          onChange={date => {
            if (date) {
              const formattedDate = format(date, 'yyyy-MM-dd');
              onChange(formattedDate);
              setStartDate(date);
            } else {
              onChange('');
            }
          }}
          dateFormat="eeee, dd MMMM"
          minDate={new Date()}
          customInput={<CustomInputCalendar />}
          ref={ref}
          {...props}
        />
      )}
    />
  );
};

CusDatePicker.displayName = 'CusDatePicker';

export default CusDatePicker;
