import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addCustomer } from "../trainnerAPI";

// eslint-disable-next-line react/prop-types
export default function CustomerAdd({handleFetch}) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    addCustomer(customer)
      .then(() => {
        handleFetch();
      })
      .catch((err) => console.error(err));
      handleClose();
      setCustomer({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
      });
  };
  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Customer
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            label="Firstname"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            label="Lastname"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            label="Street Address"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            label="Postcode"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            label="City"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            label="Email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            label="Phone"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
