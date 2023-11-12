import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
//import {ContractProvider} from './ContractContext';
import Home from "./pages/Home";
import MyReports from "./pages/MyReports";
import UploadReports from "./pages/UploadReports";
import FindHospitals from "./pages/FindHospitals";
import FindDoctors from "./pages/FindDoctors";
import Register from "./pages/Register";
import ComponentTest from "./pages/ComponentTest";
import { Provider } from "./context/context";

const App = () => {
  return (
    <Provider>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myreports" element={<MyReports />} />
          <Route path="/uploadreports" element={<UploadReports />} />
          <Route path="/findhospitals" element={<FindHospitals />} />
          <Route path="/finddoctors" element={<FindDoctors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/componenttest" element={<ComponentTest />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
