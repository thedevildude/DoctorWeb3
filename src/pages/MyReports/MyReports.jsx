import { useEffect, useState } from "react";
import { useContextState } from "../../context/context";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

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
    <div className="p-4 flex flex-col items-center w-full">
      <h1 className="text-3xl my-8 font-medium">My Reports</h1>
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
        <div className="grid grid-cols-3 gap-5">
          {reports.map((item, index) => {
            return (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
              >
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {item[1]}
                </h3>
                <a
                  href={`http://127.0.0.1:8080/ipfs/${item[0]}`}
                  className="mb-3 font-normal text-gray-700"
                >
                  {item[0]}
                </a>
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  onClick={() => {
                    console.log("Share");
                  }}
                >
                  Share
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReports;
