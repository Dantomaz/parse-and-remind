import { createContext, useState } from "react";
import Spinner from "./Spinner";

export const SpinnerContext = createContext();

const SpinnerProvider = ({ children }) => {
  const [spinnerShown, setSpinnerShown] = useState(false);
  const [spinnerText, setSpinnerText] = useState();

  const showSpinner = () => setSpinnerShown(true);

  const hideSpinner = () => {
    setSpinnerShown(false);
    setSpinnerText(null);
  };

  return (
    <SpinnerContext.Provider value={{ spinnerShown, showSpinner, hideSpinner, setSpinnerText }}>
      <Spinner show={spinnerShown} text={spinnerText} />
      {children}
    </SpinnerContext.Provider>
  );
};

export default SpinnerProvider;
