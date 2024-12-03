import * as React from "react";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Calendar from "./components/Calendar";
import { styled } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavDrawer from "./components/navigation/navdrawer";
import TrainingReport from "./components/TrainingReport";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "drawer" })(
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
        props: ({ drawer }) => drawer,
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
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavDrawer
        drawer={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Container maxWidth="xl">
        <Main drawer={drawerOpen}>
          <div style={{ marginTop: 60, marginLeft: -25}}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About/>} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/trainings" element={<TrainingList />} />
              <Route path="/calendar" element={<Calendar/>} />
              <Route path="/analytics" element={<TrainingReport />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </div>
        </Main>
      </Container>
      <CssBaseline />
    </Box>
  );
}

export default App;
