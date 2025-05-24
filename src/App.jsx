import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPDF from "./pages/UploadPDF";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPDF />} />
        <Route path="/recommendations" element={<Result />} />        
        <Route
          path="*"
          element={
            <p className="text-center mt-10">404 - Página no encontrada</p>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
