import { useState } from "react";
import styles from "./App.module.scss";
import Display from "./display/Display";
import DragAndDrop from "./drag-and-drop/DragAndDrop";
import useOcr from "./hooks/useOcr";

function App() {
  const { recognize } = useOcr();
  const [result, setResult] = useState();

  const runOcr = async (file) => {
    return await recognize(URL.createObjectURL(file));
  };

  const processImage = async (file) => {
    const result = await runOcr(file);
    if (result.error) {
      return;
    }
    setResult(result);
  };

  return (
    <div className={styles["app"]}>
      <DragAndDrop onChange={processImage} />
      {result && <Display data={result.data} error={result.error} />}
    </div>
  );
}

export default App;
