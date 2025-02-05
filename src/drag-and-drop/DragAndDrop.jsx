import React from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./DragAndDrop.module.scss";

const DragAndDrop = ({ onChange }) => {
  const fileTypes = ["png", "txt"];

  return (
    <div className={styles["container"]}>
      <FileUploader
        classes={styles["drop-area"]}
        types={fileTypes}
        label="Upload or drop your PDF here"
        hoverTitle="Drop here"
        handleChange={onChange}
      ></FileUploader>
    </div>
  );
};

export default DragAndDrop;
