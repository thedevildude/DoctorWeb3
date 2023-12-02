import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";
import MyReports from "../pages/MyReports";
import UploadReports from "../pages/UploadReports";
import FindDoctors from "../pages/FindDoctors";
import FindHospitals from "../pages/FindHospitals";
import Register from "../pages/Register";
import ShareReport from "../pages/MyReports/ShareReport";
import PatientReports from "../pages/PatientReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/reports",
        element: <MyReports />,
        children: [
          {
            path: "/reports/:filehash",
            element: <ShareReport />,
          },
        ],
      },
      {
        path: "/upload-reports",
        element: <UploadReports />,
      },
      {
        path: "/doctors",
        element: <FindDoctors />,
      },
      {
        path: "/hospitals",
        element: <FindHospitals />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/patient-reports",
        element: <PatientReports />,
      },
    ],
  },
]);

export default router;
