import { useState } from "react";
import { createWorker } from "tesseract.js";

const PARAMETERS = {
  tessedit_pageseg_mode: "4", // best paging for table recognition
  tessedit_char_blacklist: "|[]{}()",
  preserve_interword_spaces: "1",
};

const ERROR_MESSAGE = "Something went wrong with OCR process (useOcr.js)";

const resultObject = {
  data: null,
  error: null,
};

const useOcr = () => {
  const [isRecognizing, setRecognizing] = useState(false);

  const recognize = async (imageUrl) => {
    if (imageUrl) {
      setRecognizing(true);

      const worker = await createWorker();
      await worker.setParameters(PARAMETERS);
      const data = await worker.recognize(imageUrl);
      await worker.terminate();

      if (data?.data?.text) {
        resultObject.data = data?.data?.text.replace(/^\s*[\r\n]/gm, "");
      } else {
        resultObject.error = ERROR_MESSAGE;
      }

      setRecognizing(false);
      return resultObject;
    }
  };

  return { recognize, isRecognizing };
};

export default useOcr;
