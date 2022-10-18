import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-gradient-to-r from-violet-500 to-indigo-500">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
