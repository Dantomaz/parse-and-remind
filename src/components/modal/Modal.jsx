import React from "react";
import { createPortal } from "react-dom";
import Button from "../button/Button";
import styles from "./Modal.module.scss";

const Modal = ({ children, show, onOk, okText, onCancel, cancelText, style, form }) => {
  const ModalFooter = () => {
    const showOkButton = onOk || okText;
    const showCancelButton = onCancel || cancelText;
    const bothButtonsShown = showOkButton && showCancelButton;
    const footerJustifyStyle = bothButtonsShown ? "space-between" : "center";

    return (
      <div className={styles["footer"]} style={{ justifyContent: footerJustifyStyle }}>
        {showCancelButton && (
          <Button theme="secondary" onClick={onCancel || (() => {})}>
            {cancelText || "Cancel"}
          </Button>
        )}
        {showOkButton && (
          <Button type="submit" onClick={onOk || (() => {})} form={form}>
            {okText || "Okay"}
          </Button>
        )}
      </div>
    );
  };

  return (
    show &&
    createPortal(
      <div className={styles["backdrop"]}>
        <div className={styles["container"]} style={style}>
          {children}
          <ModalFooter />
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
