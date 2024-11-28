/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { addTraining } from "../trainnerAPI";

export default function TrainingAdd({ customer }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    activity: "",
    duration: "",
    date: dayjs(),
    customer: customer._links.self.href,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    if (
      !training.activity ||
      !training.duration ||
      !training.date ||
      !training.customer
    ) {
      alert("Please complete all fields.");
    } else {
      addTraining(training)
        .then(() => {
          setTraining({
            activity: "",
            duration: "",
            date: dayjs(),
            customer: "",
          });
        })
        .catch((err) => console.error(err));
      handleClose();
    }
  };
  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add New Training for {customer.firstname} {customer.lastname}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            label="Activity"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            label="Duration"
            type="number"
            fullWidth
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Date and Time"
                value={training.date}
                onChange={handleChange}
                slotProps={{ textField: { variant: "outlined" } }}
              />
            </DemoContainer>
          </LocalizationProvider>
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
    </>
  );
}
