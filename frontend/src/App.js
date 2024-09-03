import axios from "axios";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Callback from "./Pages/Callback";
import Visualizer from "./Pages/Visualizer";
import { useState } from "react";


function App() {

  const [spot, setAppSpot] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/callback" element={<Callback setAppSpot={setAppSpot} setAuthToken={setAuthToken} />}></Route>
        <Route path="/visualization" element={<Visualizer spot={spot} authToken={authToken} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
