import * as React from "react";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import About from "./components/About";
import Contacts from "./components/Contacts";
import { styled} from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/navigation/navbar";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
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
    <Box sx={{ display: 'flex' }}>
      <NavBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Container maxWidth="xl">
      <Main open={open}> 
        <div style={{ marginTop: 60 }}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
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
