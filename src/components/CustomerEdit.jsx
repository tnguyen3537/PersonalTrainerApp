import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { editCustomer } from "../trainnerAPI";

// eslint-disable-next-line react/prop-types
export default function CustomerEdit({ data, handleFetch }) {
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
    setCustomer(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // eslint-disable-next-line react/prop-types
    editCustomer(data._links.self.href, customer)
      .then(() => {
        handleFetch();
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Tooltip title="Edit customer">
        <IconButton aria-label="edit" color="disabled" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
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
