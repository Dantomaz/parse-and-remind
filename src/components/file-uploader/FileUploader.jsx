import React, { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import styles from "./FileUploader.module.scss";
import SubmitSection from "./submit-section/SubmitSection";

const FileUploader = ({ fileTypes, onFilesAdded, disableSubmit }) => {
  const inputRef = useRef();
  const [isDragging, setDragging] = useState(false);
  const [files, setFiles] = useState();

  const openFileDialog = () => {
    setDragging(false);
    inputRef.current.click();
  };

  const handleClick = (e) => {
    saveFiles(e.target.files);
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
    saveFiles(e.dataTransfer.files);
  };

  const saveFiles = (files) => {
    if (files) {
      setFiles([...files]);
    }
  };

  const submitFiles = () => {
    onFilesAdded(files);
  };

  const InvisibleInput = () => {
    return (
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleClick}
        accept={fileTypes?.map((type) => `.${type}`).join(",")}
        multiple
      ></input>
    );
  };

  return (
    <div className={styles["container"]}>
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

      <SubmitSection files={files} onSubmit={submitFiles} disableSubmit={disableSubmit} />
    </div>
  );
};

export default FileUploader;
