import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchTrainings } from "../trainnerAPI";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [colDefs] = useState([
    { field: "customer", filter: true },
    { field: "activity", filter: true },
    { field: "duration", filter: true },
    { field: "date", filter: true, 
      valueFormatter: (params) =>
        dayjs(params.value).format("DD/MM/YYYY HH:mm"),
    },
  ]);
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchTrainings()
      .then((data) => {
        const trainings = data.map((training) => {
          return {
            ...training,
            customer: `${training.customer.firstname} ${training.customer.lastname}`,
          };
        });
        setTrainings(trainings);  
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>Training Sessions</h2>
      <div className="ag-theme-material" 
      style={{ height: 600 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
          onFirstDataRendered={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
    </>
  );
}
