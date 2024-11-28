import * as React from "react";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import About from "./components/About";
import Contacts from "./components/Contacts";
import { styled } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavDrawer from "./components/navigation/navdrawer";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

function App() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavDrawer
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Container maxWidth="xl">
        <Main open={open}>
          <div style={{ marginTop: 60, marginLeft: -25}}>
            <Routes>
              <Route path="/" element={<About open={open} />} />
              <Route path="/about" element={<About open={open}/>} />
              <Route path="/customers" element={<CustomerList open={open}/>} />
              <Route path="/trainings" element={<TrainingList open={open}/>} />
              <Route path="/contacts" element={<Contacts open={open}/>} />
            </Routes>
          </div>
        </Main>
      </Container>
      <CssBaseline />
    </Box>
  );
}

export default App;
