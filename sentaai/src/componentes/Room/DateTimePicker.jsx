const DateTimePicker = ({ date, time, onDateChange, onTimeChange }) => (
    <div className="flex gap-4 mb-6">
      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        className="border px-2 py-1 rounded"
      />
    </div>
  );
  
  export default DateTimePicker;
  