import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Dashboard, History, Login, Question, Reset, Admin } from "@/pages";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate("/login");
    };

    window.addEventListener("api:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("api:unauthorized", handleUnauthorized);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<History />} />
      <Route path="/question/:id" element={<Question />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
