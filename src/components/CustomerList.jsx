import { useState, useEffect } from "react";
import { fetchCustomers } from "../customerAPI";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [colDefs] = useState([
    { field: "firstname", filter: true },
    { field: "lastname", filter: true },
    { field: "streetaddress", filter: true},
    { field: "postcode", filter: true },
    { field: "city", filter: true },
    { field: "email", filter: true },
    { field: "phone", filter: true },
  ]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>Customers</h2>
       <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}
