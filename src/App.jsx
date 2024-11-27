import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import About from "./components/About";
import Contacts from "./components/Contacts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/navigation/navbar";

function App() {
  return (
    <Container maxWidth="xl">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
        <CssBaseline />
      </Router>
    </Container>
  );
}

export default App;
