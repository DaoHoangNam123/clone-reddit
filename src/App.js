import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutTheme from "./HOC/LayouTheme/LayoutTheme";
import SubReddit from "./pages/SubReddit/SubReddit";
import Thread from "./pages/Thread/Thread";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LayoutTheme component={<SubReddit />} />}
          ></Route>

          {/* Route to each reddit thread */}
          <Route
            path="/r/DotA2/comments/:id/:title"
            element={<LayoutTheme component={<Thread />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
