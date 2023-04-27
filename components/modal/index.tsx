import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Delete from "../icons/delete";
interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  title?: string;
}

const Modal = ({ children, onClose, title }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(
        <div
          className={`fixed top-0 w-screen h-screen bg-black/50 backdrop-blur-sm flex flex-col justify-end z-50 text-white`}
          onClick={onClose}
        >
          <div
            className='pt-[2px] rounded-t-xl '
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className={`rounded-t-xl bg-indigo-500 p-6 flex flex-col w-full`}
            >
              <div className='flex flex-row justify-between mb-4'>
                {title && <span className='font-bold uppercase'>{title}</span>}
                <button onClick={onClose}>
                  <Delete />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>,
        document.getElementById("modal-target") as HTMLElement
      )
    : null;
};

export default Modal;
