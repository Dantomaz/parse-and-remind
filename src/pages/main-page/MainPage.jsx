import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../components/file-uploader/FileUploader";
import { ALLOWED_FILE_TYPES } from "../../constants";
import useOcr from "../../hooks/useOcr";
import usePostProcessor from "../../hooks/usePostProcessor";
import { getAllowedFileExtentions } from "../../utils";
import styles from "./MainPage.module.scss";

export const ProcessorContext = createContext();

const MainPage = () => {
  const { recognize } = useOcr();
  const { processFiles } = usePostProcessor();
  const navigate = useNavigate();
  const [isProcessing, setProcessing] = useState(false);

  const runOcr = async (file) => {
    return await recognize(URL.createObjectURL(file));
  };

  const readFromTxt = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve({ data: reader.result, error: null });
      reader.onerror = (error) => reject({ data: null, error: error });
      reader.readAsText(file);
    });
  };

  const processFilesAdded = async (files) => {
    if (!files) {
      return;
    }

    setProcessing(true);

    const filesContents = await Promise.all(files.map(readFile));
    const events = processFiles(filesContents);

    setProcessing(false);

    navigate("calendar", { state: { events } });
  };

  const readFile = async (file) => {
    let result;

    if (file.type === ALLOWED_FILE_TYPES.txt.type) {
      result = await readFromTxt(file);
    } else {
      result = await runOcr(file);
    }

    if (result?.error) {
      return;
    }

    return result.data;
  };

  return (
    <ProcessorContext.Provider value={{ isProcessing }}>
      <div className={styles["container"]}>
        <FileUploader fileTypes={getAllowedFileExtentions()} onFilesAdded={processFilesAdded} />
      </div>
    </ProcessorContext.Provider>
  );
};

export default MainPage;
