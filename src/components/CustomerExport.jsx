import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

// eslint-disable-next-line react/prop-types
const CustomerExport = ({ customers }) => {
  const customerColumns = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Street Address", key: "streetaddress" },
    { label: "Postcode", key: "postcode" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button>
        <CSVLink
          data={customers}
          headers={customerColumns}
          filename="customerlist.csv"
          className="export-button"
        >
          CSV Export
        </CSVLink>
      </Button>
    </div>
  );
};

export default CustomerExport;
