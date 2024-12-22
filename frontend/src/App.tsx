import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ContactUs from './pages/ContactUs/ContactUs';
import History from './pages/History/History';
import Predict from './pages/Predict/Predict';
import Reset from "./pages/Reset/Reset.tsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/history" element={<History />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
  );
}

export default App;