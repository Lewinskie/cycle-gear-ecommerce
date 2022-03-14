import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BootcampsPage from "./pages/BootcampsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<BootcampsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
