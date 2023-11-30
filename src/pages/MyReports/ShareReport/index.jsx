import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwitchInput from "../../../components/SwitchInput";

const ShareReport = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({
    password: "",
    recipient: "",
  });
  const userType = [{ name: "Doctor" }, { name: "Hospital" }];
  const navigate = useNavigate();
  const { filehash } = useParams();

  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
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
                type="password"
                placeholder="Enter password to file"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                className="w-full p-2 mt-6 rounded-md border-2 border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <SwitchInput options={userType} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareReport;
