import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2> My Contacts</h2>
      <div className="nav-buttons">
        {!token ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="nav-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}