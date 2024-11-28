import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchTrainings, deleteTraining } from "../trainnerAPI";

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
    {
      cellRenderer: (params) => (
        <Button
          color="error"
          onClick={() => handleDelete(params.data.id)}
        >
          Delete
        </Button>
      ),
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure? This action cannot be undone")) {
      deleteTraining(id)
        .then(() => {
          handleFetch();
        })
        .catch((err) => console.error(err));
    }
  }

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
