import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalendarPage from "../pages/calendar-page/CalendarPage";
import MainPage from "../pages/main-page/MainPage";

const Routing = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
      {children}
    </BrowserRouter>
  );
};

export default Routing;
