import { useNavigate } from "react-router-dom";
import FileUploader from "../../components/file-uploader/FileUploader";
import useOcr from "../../hooks/useOcr";
import usePostProcessor from "../../hooks/usePostProcessor";
import styles from "./MainPage.module.scss";

const FILE_TYPES = {
  png: "image/png",
  txt: "text/plain",
};

const MainPage = () => {
  const { recognize } = useOcr();
  const { postProcess } = usePostProcessor();
  const navigate = useNavigate();

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

  const processFile = async (file) => {
    let data;

    if (file.type === FILE_TYPES.png) {
      data = await runOcr(file);
    } else if (file.type === FILE_TYPES.txt) {
      data = await readFromTxt(file);
    }

    if (data?.error) {
      return;
    }

    data = postProcess(data.data);

    navigate("calendar", { state: { data } });
  };

  return (
    <div className={styles["container"]}>
      <FileUploader fileTypes={Object.keys(FILE_TYPES)} onFileAdded={processFile} />
    </div>
  );
};

export default MainPage;
