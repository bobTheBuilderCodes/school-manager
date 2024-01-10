import React, { ReactNode } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen = true, onClose, children }) => {
  return isOpen ? (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
        </div>

        <div className="bg-white p-4 rounded-lg z-10 relative min-w-1/4 min-h-28">
          <button
            className="absolute top-0 right-0 m-4 text-gray-900"
            onClick={onClose}
          >
            {/* Close */}
          </button>
          <div className="modal-content text-gray-900">{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
