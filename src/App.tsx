import "./App.css";
import "react-clock/dist/Clock.css";
import ClockClockPage from "./pages/ClockClockPage";
import { Routes, Route } from "react-router-dom";
import CheckClockBlockPage from "./pages/CheckClockBlockPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClockClockPage />} />
        <Route
          path="/check-clock-block/:size?"
          element={<CheckClockBlockPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
