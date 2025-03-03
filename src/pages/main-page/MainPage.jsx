import { useGoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { getCalendarScope } from "../../api/googleCalendarApi";
import Button from "../../components/button/Button";
import FileUploader from "../../components/file-uploader/FileUploader";
import { SpinnerContext } from "../../components/spinner/SpinnerProvider";
import { ALLOWED_FILE_TYPES } from "../../constants";
import useOcr from "../../hooks/useOcr";
import usePostProcessor from "../../hooks/usePostProcessor";
import { getAllowedFileExtentions } from "../../utils";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);
  const { recognize } = useOcr();
  const { processFiles } = usePostProcessor();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(sessionStorage.getItem("googleAccessToken") ? true : false);

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

    showSpinner();

    const filesContents = await Promise.all(files.map(readFile));
    const events = processFiles(filesContents);

    hideSpinner();

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
    setUserLoggedIn(true);
  }

  const logout = () => {
    sessionStorage.removeItem("googleAccessToken");
    setUserLoggedIn(false);
  };

  return (
    <div className={styles["container"]}>
      <main className={styles["card"]}>
        <header className={styles["header"]}>
          <h1>Parse and Remind</h1>
          {userLoggedIn ? (
            <Button theme="secondary" style={{ font: "white" }} onClick={logout}>
              <FcGoogle style={{ marginRight: "5px" }} /> Logout from Google
            </Button>
          ) : (
            <Button onClick={googleLogin}>
              <FcGoogle style={{ marginRight: "5px" }} /> Login with Google
            </Button>
          )}
        </header>
        <FileUploader fileTypes={getAllowedFileExtentions()} onFilesAdded={processFilesAdded} disableSubmit={!userLoggedIn} />
      </main>
    </div>
  );
};

export default MainPage;
