// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Task from "./pages/Task";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <div className="mx-10">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route element={<ProtectRoute />}>
        <Route path="/" element={<Task />} />
        </Route>
          
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
