import { Cancel01Icon } from "hugeicons-react";
import styles from "./Modal.module.css";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <Cancel01Icon />
        </button>
        {children}
      </div>
    </div>
  );
}
