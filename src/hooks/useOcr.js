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
  const recognize = async (imageUrl) => {
    if (imageUrl) {
      const worker = await createWorker();
      await worker.setParameters(PARAMETERS);
      const data = await worker.recognize(imageUrl);
      await worker.terminate();

      if (data?.data?.text) {
        resultObject.data = data?.data?.text;
      } else {
        resultObject.error = ERROR_MESSAGE;
      }

      return resultObject;
    }
  };

  return { recognize };
};

export default useOcr;
