import "./Calendar.css";
import DateCard from "./DateCard";

function Calendar() {
  return (
    <div className="calendar">
      <h2>Calender</h2>
      <div className="controlCalendar">
        <div>
          <p>{"<"}</p>
          <p>December 2024</p>
          <p>{">"}</p>
        </div>
      </div>
      <div className="calendarDayContainer">
        <div className="calendarDays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div className="calendarDate">
          <div className="dateCardContainer">
            <DateCard />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
