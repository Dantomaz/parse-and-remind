import React, { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import styles from "./FileUploader.module.scss";

const FileUploader = ({ fileTypes, onFileAdded }) => {
  const inputRef = useRef();
  const [isDragging, setDragging] = useState(false);

  const openFileDialog = () => {
    setDragging(false);
    inputRef.current.click();
  };

  const handleClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileAdded(file);
    }
  };

  const disableEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    disableEvents(e);
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    disableEvents(e);
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileAdded(file);
    }
  };

  const InvisibleInput = () => {
    return (
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleClick}
        accept={fileTypes?.map((type) => `.${type}`).join(",")}
      ></input>
    );
  };

  return (
    <div
      className={`${styles["drop-zone"]} ${isDragging && styles["drop-zone-dragging"]}`}
      onDragOver={disableEvents}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <InvisibleInput />

      <div className={styles["file-types"]}>{fileTypes?.join(",")}</div>

      <FaFileUpload className={styles["upload-icon"]} />

      {isDragging ? (
        <p>Drop here</p>
      ) : (
        <>
          <p>Click to upload</p>
          <p>or drag & drop</p>
        </>
      )}
    </div>
  );
};

export default FileUploader;
