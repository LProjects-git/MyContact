import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage'; 
import LoginPage from './pages/LoginPage.js';       
import ContactsPage from './pages/ContactsPage'; 
import Navbar from './components/Navbar';

function App() {
  const token = localStorage.getItem('token');
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>

      </BrowserRouter>
    </div>
  );
}
export default App;