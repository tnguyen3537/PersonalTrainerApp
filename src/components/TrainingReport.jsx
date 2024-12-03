import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import _ from "lodash";
import { fetchTrainings } from "../trainnerAPI";

export default function TrainingReport() {
  const [activityStat, setActivityStat] = useState([]);

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        const grouped = _.groupBy(data, "activity");
        const activityStat = _.map(grouped, (value, key) => ({
          activity: key,
          totalDuration: _.sumBy(value, "duration"),
        }));
        setActivityStat(activityStat);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Training Report</h2>
      <BarChart width={800} height={400} data={activityStat}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis
          label={{
            value: "Duration (min)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Bar dataKey="totalDuration" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
