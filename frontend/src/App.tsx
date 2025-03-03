import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { ContactUs, Dashboard, History, Login, Predict, Reset } from "@/pages";

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
      <Route path="/dashboard/contact-us" element={<ContactUs />} />
      <Route path="/history" element={<History />} />
      <Route path="/predict/:id" element={<Predict />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
  );
}

export default App;
