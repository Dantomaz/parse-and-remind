import { ALLOWED_FILE_TYPES } from "../../../constants";
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

const SubmitSection = ({ files, onSubmit }) => {
  return (
    files && (
      <div className={styles["container"]}>
        {files?.map((file, index) => (
          <FileItem key={index} file={file} />
        ))}

        <Button className={styles["button"]} onClick={onSubmit}>
          Confirm
        </Button>
      </div>
    )
  );
};

export default SubmitSection;
