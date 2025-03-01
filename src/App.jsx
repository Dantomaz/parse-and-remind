import { GoogleOAuthProvider } from "@react-oauth/google";
import Routing from "./routing/Routing";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID}>
      <Routing />
    </GoogleOAuthProvider>
  );
}

export default App;
