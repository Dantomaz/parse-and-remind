import { useState } from "react";
import styles from "./App.module.scss";
import Display from "./display/Display";
import DragAndDrop from "./drag-and-drop/DragAndDrop";
import useOcr from "./hooks/useOcr";
import usePostProcessor from "./hooks/usePostProcessor";

const FILE_TYPE = {
  png: "image/png",
  txt: "text/plain",
};

function App() {
  const { recognize } = useOcr();
  const { postProcess } = usePostProcessor();
  const [result, setResult] = useState();

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

    if (file.type === FILE_TYPE.png) {
      data = await runOcr(file);
    } else if (file.type === FILE_TYPE.txt) {
      data = await readFromTxt(file);
    }

    if (data?.error) {
      setResult(data.error);
      return;
    }

    data = postProcess(data.data);
    setResult(data);
  };

  return (
    <div className={styles["app"]}>
      <DragAndDrop onChange={processFile} />
      {/* {result && <Display text={result} />} */}
    </div>
  );
}

export default App;
