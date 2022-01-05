import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MainComponent from "./MainComponent";
import MyTrees from "./MyTrees";

function App() {
  const routes = (
    <Routes>
      <Route path="/mytrees" element={<MyTrees />} />
      <Route path="/" element={<MainComponent />} />
    </Routes>
  );

  return (
    <div className="App">
      <Router>
        <ul style={{ listStyle: "none" }}>
          <li>
            <Link to="/">Create a tree</Link>
          </li>
          <li>
            <Link to="/mytrees">My trees</Link>
          </li>
        </ul>
        {routes}
      </Router>
    </div>
  );
}

export default App;
