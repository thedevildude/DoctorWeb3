import { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "../SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import {
  useContextState,
  useContextDispatch,
} from "../../context/application/context";
import { connect } from "../../context/application/actions";

const Sidebar = () => {
  const { address, isLoading, isConnected, errorMessage } = useContextState();
  const contextDispatch = useContextDispatch();

  const [navbar, setNavbar] = useState(false);
  const showNavbar = () => setNavbar(!navbar);

  const connectWallet = async () => {
    await connect(contextDispatch);
  };

  if (errorMessage !== "") {
    alert(errorMessage);
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="bg-[#00073D] h-20 text-white flex items-center justify-between">
          <Link path="#" className="menu-bars">
            <div onClick={showNavbar}>
              {!navbar ? <FaIcons.FaBars /> : <AiIcons.AiOutlineClose />}
            </div>
          </Link>
          <div className="top-menu">
            <p className="top-menu-items">Address: {address}</p>
            <div>
              <button
                className="button-18"
                style={{
                  backgroundColor: isConnected ? "#EE6C4D" : "",
                  color: isConnected ? "white" : "",
                }}
                onClick={() => connectWallet()}
              >
                {isLoading
                  ? "Loading..."
                  : isConnected
                  ? "Connected"
                  : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
        <nav className={navbar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showNavbar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="nav-title-box">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};
export default Sidebar;
