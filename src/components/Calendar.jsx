import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchTrainings } from "../trainnerAPI";

const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
  const [trainingEvents, setTrainingEvents] = useState([]);
  const mapToCalendar = (trainings) => {
    return trainings.map((training) => ({
      title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname} `,
      start: new Date(training.date),
      end: moment(training.date).add(training.duration, "minutes").toDate(),
    }));
  };

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        setTrainingEvents(mapToCalendar(data));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Training Calendar</h2>
      <Calendar
        style={{ height: 700 }} // Set the height of the calendar
        localizer={localizer}
        events={trainingEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="week" // Set the default view to "week"
        views={["day", "week", "month"]}
      />
    </div>
  );
}
