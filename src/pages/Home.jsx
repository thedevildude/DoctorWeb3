import { useState, useEffect } from "react";
import { ethers } from "ethers";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { IconContext } from "react-icons";
import "../css/Web3card.css";
import { useNavigate } from "react-router-dom";
import { useContextState } from "../context/application/context";

const Home = () => {
  const { isLoading, isConnected, signer, doctorWeb3 } = useContextState();
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      if (!isConnected || isLoading) return;
      const doctorAddress = await doctorWeb3.findDoctors();
      const hospitalAddress = await doctorWeb3.findHospitals();
      const balance =
        Math.round(ethers.utils.formatEther(await signer.getBalance()) * 100) /
        100;
      setStats([
        {
          title: "Total Available Balance",
          icon: <FaIcons.FaEthereum />,
          data: balance,
        },
        {
          title: "Total Reports Uploaded",
          icon: <IoIcons.IoIosPaper />,
          data: "0",
        },
        {
          title: "Total Doctors Registered",
          icon: <FaIcons.FaStethoscope />,
          data: doctorAddress.length,
        },
        {
          title: "Total Hospitals Registered",
          icon: <FaIcons.FaHospital />,
          data: hospitalAddress.length,
        },
      ]);
    };
    getDetails();
  }, [isLoading, isConnected, signer, doctorWeb3]);

  return (
    <>
      <IconContext.Provider value={{ size: 50, color: "#fff" }}>
        <div className="home">
          <div className="home-title">
            <h1 className="text-4xl mt-8 font-bold">DoctorWeb3</h1>
          </div>
          <div className="text-container">
            <p>
              A Decentralized and Secure way for sharing patient reports with
              hospitals and doctors
            </p>
          </div>
          <div className="cards">
            {isLoading && !isConnected
              ? ""
              : stats.map((item, index) => {
                  return (
                    <div key={index} className="card-container">
                      <div className="card-text-box">
                        <p className="card-head-text">{item.title}</p>
                        <p className="card-value-text">{item.data}</p>
                      </div>
                      <div className="card-icon">{item.icon}</div>
                    </div>
                  );
                })}
          </div>
          <button
            className="button-18"
            onClick={() => navigate("/upload-reports")}
          >
            Upload Reports
          </button>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Home;
