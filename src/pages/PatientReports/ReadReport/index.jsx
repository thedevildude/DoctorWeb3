import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContextState } from "../../../context/application/context";

const ReadReport = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({
    notes: "",
  });
  const [report, setReport] = useState(undefined);
  const { isLoading, isConnected, doctorWeb3, signer } = useContextState();
  const navigate = useNavigate();
  const { reportId } = useParams();

  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };

  useEffect(() => {
    if (!isConnected || isLoading) {
      navigate("../");
    }
  }, [isConnected, isLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorWeb3) return;
      const report = await doctorWeb3.getSharedReport(reportId);
      const detailedReport = await doctorWeb3.getDetailedReports(report[0]);
      setReport({
        fileHash: report[0],
        patientAddress: report[1],
        recipientAddress: report[2],
        secretMessage: report[3],
        detailedReport,
      });
      console.log(report);
      console.log(detailedReport);
    };
    fetchData();
  }, [doctorWeb3, reportId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signedMessage = await signer.signMessage(form.notes);
    console.log(signedMessage);
    const tx = await doctorWeb3.shareReportResponse(reportId, form.notes);
    await tx.wait();
    alert("Report feedback shared back successfully!");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="w-full inline-block max-w-3xl p-6 my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl">
              <h2 className="text-xl font-medium">
                Read Report
                <span className="ml-5 text-sm p-2 bg-green-400 rounded-md">
                  {report && report.detailedReport["category"]}
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 mt-5">
                  <p>Patient:</p>
                  <p>{report && report.patientAddress}</p>
                </div>
                <div className="flex gap-2">
                  <p>Gender:</p>
                  <p>{report && report.detailedReport["patientInfo"][4]}</p>
                </div>
                <div className="flex gap-2">
                  <p>Bloodgroup:</p>
                  <p>{report && report.detailedReport["patientInfo"][5]}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p>Secret message:</p>
                  <input
                    type="text"
                    value={report && report.secretMessage}
                    readOnly
                    disabled
                    className="w-full p-2 mt-2 rounded-md border-2 border-gray-200 text-gray-400"
                  />
                </div>
                <p>
                  File URL:{" "}
                  <a
                    href={`http://127.0.0.1:8080/ipfs/${
                      report && report.fileHash
                    }`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {report && report.fileHash}
                  </a>
                </p>
                <p>{report && report[1]}</p>
                <input
                  type="text"
                  placeholder="Enter notes to file"
                  value={form.notes}
                  onChange={(e) => {
                    setForm({ ...form, notes: e.target.value });
                  }}
                  className="w-full p-2 mt-6 rounded-md border-2 border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <button
                className="block mt-6 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={handleSubmit}
              >
                Share Feedback
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReadReport;
