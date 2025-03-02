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

const SubmitSection = ({ files, onSubmit, disableSubmit }) => {
  return (
    files && (
      <div className={styles["grid"]}>
        <section className={styles["section"]}>
          {files?.map((file, index) => (
            <FileItem key={index} file={file} />
          ))}
        </section>
        <section className={styles["section"]}>
          <Button className={styles["button"]} disabled={disableSubmit} onClick={onSubmit}>
            Next
          </Button>
        </section>
      </div>
    )
  );
};

export default SubmitSection;
