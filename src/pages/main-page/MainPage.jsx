import { useGoogleLogin } from "@react-oauth/google";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCalendarScope } from "../../api/googleCalendarApi";
import Button from "../../components/button/Button";
import FileUploader from "../../components/file-uploader/FileUploader";
import { ALLOWED_FILE_TYPES } from "../../constants";
import useOcr from "../../hooks/useOcr";
import usePostProcessor from "../../hooks/usePostProcessor";
import { getAllowedFileExtentions } from "../../utils";
import styles from "./MainPage.module.scss";
import { FcGoogle } from "react-icons/fc";

export const ProcessorContext = createContext();

const MainPage = () => {
  const { recognize } = useOcr();
  const { processFiles } = usePostProcessor();
  const navigate = useNavigate();
  const [isProcessing, setProcessing] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState(sessionStorage.getItem("googleAccessToken") || null);

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: getCalendarScope(),
    onSuccess: login,
    onError: console.error,
  });

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

  function login(googleResponse) {
    sessionStorage.setItem("googleAccessToken", googleResponse.access_token);
    setGoogleAccessToken(googleResponse.access_token);
  }

  const logout = () => {
    sessionStorage.removeItem("googleAccessToken");
    setGoogleAccessToken(null);
  };

  return (
    <ProcessorContext.Provider value={{ isProcessing }}>
      <div className={styles["container"]}>
        <main>
          <header className={styles["header"]}>
            <h1>Parse and Remind</h1>
            {googleAccessToken ? (
              <Button className={styles["button"]} onClick={logout}>
                <FcGoogle style={{ marginRight: "5px" }} /> Logout from Google
              </Button>
            ) : (
              <Button className={styles["button"]} onClick={googleLogin}>
                <FcGoogle style={{ marginRight: "5px" }} /> Login with Google
              </Button>
            )}
          </header>
          <FileUploader fileTypes={getAllowedFileExtentions()} onFilesAdded={processFilesAdded} disableSubmit={!!googleAccessToken} />
        </main>
      </div>
    </ProcessorContext.Provider>
  );
};

export default MainPage;
