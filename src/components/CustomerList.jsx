import { useState, useEffect, useMemo } from "react";
import { fetchCustomers, deleteCustomer } from "../trainnerAPI";
import { AgGridReact } from "ag-grid-react";
import Snackbar from "@mui/material/Snackbar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CustomerEdit from "./CustomerEdit";
import CustomerAdd from "./CustomerAdd";
import TrainingAdd from "./TrainingAdd";
import CustomerExport from "./CustomerExport";

export default function CustomerList() {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [colDefs] = useState([
    { field: "firstname" },
    { field: "lastname" },
    { field: "streetaddress", flex: 2 },
    { field: "postcode" },
    { field: "city", flex: 2 },
    { field: "email", flex: 2 },
    { field: "phone", flex: 2 },

    {
      cellRenderer: (params) => (
        <TrainingAdd customer={params.data} handleFetch={handleFetch} />
      ),
      flex: 2,
      filter: false,
    },

    {
      cellRenderer: (params) => (
        <CustomerEdit data={params.data} handleFetch={handleFetch} />
      ),
      filter: false,
    },
    {
      cellRenderer: (params) => (
        <Tooltip title="Delete customer">
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleDelete(params.data._links.customer.href)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
      filter: false,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
    }),
    []
  );

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  const handleDelete = (url) => {
    if (window.confirm("Are you sure")) {
      deleteCustomer(url)
        .then(() => {
          handleFetch();
          setDeleteStatus(true);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <h2>Customers</h2>
      <div className="ag-theme-material" style={{ height: 600 }}>
        <CustomerAdd handleFetch={handleFetch} />
        <CustomerExport customers={customers} />
        <AgGridReact
          defaultColDef={defaultColDef}
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>

      <div>
        <Snackbar
          open={deleteStatus}
          autoHideDuration={3000}
          onClose={() => setDeleteStatus(false)}
          message="Customer Deleleted"
        ></Snackbar>
      </div>
    </>
  );
}
