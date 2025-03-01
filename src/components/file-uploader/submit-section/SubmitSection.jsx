import { useContext, useEffect } from "react";
import { ALLOWED_FILE_TYPES } from "../../../constants";
import { ProcessorContext } from "../../../pages/main-page/MainPage";
import { splitFileExtension } from "../../../utils";
import Button from "../../button/Button";
import styles from "./SubmitSection.module.scss";

const FileItem = ({ file }) => {
  const [name, extension] = splitFileExtension(file.name);
  const icon = ALLOWED_FILE_TYPES[extension].icon;

  return (
    <div className={styles["file-item"]}>
      {icon}
      {<span>{name}</span>}
    </div>
  );
};

const SubmitSection = ({ files, onSubmit, disableSubmit }) => {
  const { isProcessing } = useContext(ProcessorContext);

  // update cursor for the entire page to show loading indicator
  useEffect(() => {
    if (isProcessing) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
    }

    // cleanup function to reset cursor when component unmounts or isProcessing changes
    return () => {
      document.body.style.cursor = "default";
    };
  }, [isProcessing]);

  return (
    files && (
      <div className={styles["container"]}>
        {files?.map((file, index) => (
          <FileItem key={index} file={file} />
        ))}

        <Button
          className={`${styles["button"]} ${isProcessing && styles["button-loading"]}`}
          disabled={!disableSubmit || isProcessing}
          onClick={onSubmit}
        >
          {isProcessing ? "Processing..." : "Confirm"}
        </Button>
      </div>
    )
  );
};

export default SubmitSection;
