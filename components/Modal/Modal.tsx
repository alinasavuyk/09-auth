"use client";

import css from './Modal.module.css'
import { createPortal } from "react-dom";
import { useEffect} from 'react';
import type { ReactNode } from 'react';


interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}
function Modal ({ onClose, children}: ModalProps){
useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
   useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
	  };
	}, [onClose]);
    return createPortal(
        <div
  className={css.backdrop}
  onClick={handleBackdropClick}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
  {children}
  </div>
</div>, document.body

    )
}
export default Modal