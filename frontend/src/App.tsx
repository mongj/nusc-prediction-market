import { Route, Routes } from "react-router-dom";

import { ContactUs, Dashboard, History, Login, Predict, Reset } from "@/pages";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/contactus" element={<ContactUs />} />
      <Route path="/history" element={<History />} />
      <Route path="/predict/:id" element={<Predict />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
  );
}

export default App;
