import React from "react";
import { Transition } from "@headlessui/react";

const ConfirmationPopup = ({ isOpen, onClose, message, success = false }) => {
  return (
    <Transition show={isOpen} as="div">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={`relative ${success ? "bg-lime-700" : "bg-red-700"} p-8 rounded-md shadow-md`}
          >
            <div className="text-lg text-gray-200 font-semibold mb-4">
              {message}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default ConfirmationPopup;
