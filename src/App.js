import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutTheme from "./HOC/LayouTheme/LayoutTheme";
import SubReddit from "./pages/SubReddit/SubReddit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LayoutTheme component={<SubReddit />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
