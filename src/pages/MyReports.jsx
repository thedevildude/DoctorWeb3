import { useEffect, useState } from "react";
import { useContextState } from "../context/context";
import "../css/MyReports.css";
import { ColorRing } from "react-loader-spinner";

const MyReports = () => {
  const { isLoading, isConnected, doctorWeb3 } = useContextState();
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);

  useEffect(() => {
    const getDetailedReport = async () => {
      if (isLoading || !isConnected) return;
      setReportsLoading(true);
      const reports = await doctorWeb3.getPatientReports();
      let detailedReport = [];
      for (let i = 0; i < reports.length; i++) {
        const data = await doctorWeb3.getDetailedReports(reports[i]);
        detailedReport.push([data[0], data[1]]);
      }
      setReports(detailedReport);
      setReportsLoading(false);
    };
    getDetailedReport();
  }, [doctorWeb3, isConnected, isLoading]);

  return (
    <div className="my-reports">
      <h1 className="my-reports-title">My Reports</h1>
      <div className="reports-box">
        {isLoading || !isConnected || reportsLoading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          reports.map((item, index) => {
            return (
              <div key={index} className="report-box">
                <div className="report-filehash-box">
                  <p className="filehash-box-title">FileHash</p>
                  <p className="filehash-box-filehash">
                    <a
                      href={`http://127.0.0.1:8080/ipfs/${item[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item[0]}
                    </a>
                  </p>
                </div>
                <p className="report-box-category">{item[1]}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyReports;
