import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "My Reports",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Upload Reports",
    path: "/upload-reports",
    icon: <FaIcons.FaFileUpload />,
    cName: "nav-text",
  },
  {
    title: "Find Doctors",
    path: "/doctors",
    icon: <FaIcons.FaStethoscope />,
    cName: "nav-text",
  },
  {
    title: "Find Hospitals",
    path: "/hospitals",
    icon: <FaIcons.FaHospital />,
    cName: "nav-text",
  },
  {
    title: "Register",
    path: "/register",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
];
