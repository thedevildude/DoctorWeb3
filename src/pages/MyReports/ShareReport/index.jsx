import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwitchInput from "../../../components/SwitchInput";
import { useContextState } from "../../../context/application/context";

const ShareReport = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({
    notes: "",
    recipient: "",
  });
  const [userType, setUserType] = useState(false);
  const [list, setList] = useState([]); // [[address, name, id], ...]
  const { isLoading, isConnected, doctorWeb3, signer } = useContextState();
  const navigate = useNavigate();
  const { filehash } = useParams();

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
      if (!userType) {
        const doctorList = await doctorWeb3.findDoctors();
        const doctorDetails = await Promise.all(
          doctorList.map(async (doctorAddress) => {
            return await doctorWeb3.getAuthorizedDHDetails(doctorAddress);
          })
        );
        setList(doctorDetails);
      } else {
        const hospitalList = await doctorWeb3.findHospitals();
        const hospitalDetails = await Promise.all(
          hospitalList.map(async (hospitalAddress) => {
            return await doctorWeb3.getAuthorizedDHDetails(hospitalAddress);
          })
        );
        setList(hospitalDetails);
      }
    };
    fetchData();
  }, [doctorWeb3, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signedMessage = await signer.signMessage(form.notes);
    console.log(signedMessage);
    const tx = await doctorWeb3.shareReport(
      filehash,
      form.recipient,
      form.notes
    );
    await tx.wait();
    alert("Report shared successfully!");
    closeModal();
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
              <h2 className="text-xl font-medium">Share</h2>
              <input
                type="text"
                value={filehash}
                readOnly
                disabled
                className="w-full p-2 mt-6 rounded-md border-2 border-gray-200 text-gray-400"
              />
              <input
                type="text"
                placeholder="Enter notes to file"
                value={form.notes}
                onChange={(e) => {
                  setForm({ ...form, notes: e.target.value });
                }}
                className="w-full p-2 mt-6 rounded-md border-2 border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <div className="mt-6">
                <SwitchInput enabled={userType} setEnabled={setUserType} />
              </div>
              <p className="mt-6 mb-2 text-gray-500">
                {userType ? "Select a Hospital" : "Select a Doctor"}
              </p>
              <select
                defaultValue={
                  userType ? "Choose a hospital" : "Choose a doctor"
                }
                onChange={(e) => {
                  setForm({ ...form, recipient: e.target.value });
                }}
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>
                  {userType ? "Choose a hospital" : "Choose a doctor"}
                </option>
                {list.map((details) => (
                  <option key={details[0]} value={details[0]}>
                    {details[1]} ({details[0]})
                  </option>
                ))}
              </select>
              <button
                className="block mt-6 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareReport;
