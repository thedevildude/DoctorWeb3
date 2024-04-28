import { useEffect, useState } from "react";
import { useContextState } from "../../context/application/context";
import { useNavigate, Outlet } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const PatientReports = () => {
  const { isLoading, isConnected, doctorWeb3 } = useContextState();
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailedReport = async () => {
      if (isLoading || !isConnected) return;
      setReportsLoading(true);
      const reportIds = await doctorWeb3.getSharedReportIds();
      console.log(reportIds);
      const detailedReports = await Promise.all(
        reportIds.map(async (reportId) => {
          const report = await doctorWeb3.getSharedReport(reportId);
          return {
            fileHash: report[0],
            patientAddress: report[1],
            secretMessage: report[2],
            reportId: reportId,
          };
        })
      );
      setReports(detailedReports);
      setReportsLoading(false);
    };
    getDetailedReport();
  }, [doctorWeb3, isConnected, isLoading]);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-medium">Received Patients Reports</h1>
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
        <div className="grid grid-cols-3 gap-5 mt-6 box-border w-full">
          {reports.map((report, index) => {
            return (
              <div
                key={index} // we don't change the order of the reports, so we can use the index as key
                className="p-6 w-auto bg-white border border-gray-200 break-words rounded-lg shadow overflow-hidden"
              >
                <h3 className="mb-2 text-md font-bold tracking-tight text-gray-900">
                  Sender:{" "}
                  <span className="font-normal">{report.patientAddress}</span>
                </h3>
                <p className="mb-3 font-normal text-xs truncate ...">
                  File:{" "}
                  <a
                    href={`http://127.0.0.1:8080/ipfs/${report.fileHash}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {report.fileHash}
                  </a>
                </p>
                <button
                  className="block mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  onClick={() => {
                    navigate(`./${report.reportId}`);
                  }}
                >
                  Read
                </button>
              </div>
            );
          })}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default PatientReports;
