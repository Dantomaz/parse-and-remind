import { GoogleOAuthProvider } from "@react-oauth/google";
import Routing from "./routing/Routing";
import SpinnerProvider from "./components/spinner/SpinnerProvider";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID}>
      <SpinnerProvider>
        <Routing />
      </SpinnerProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
