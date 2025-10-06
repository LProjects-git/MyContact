import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ supprime le token
    alert('Logged out successfully'); // ✅ message de confirmation
    navigate('/login'); // ✅ redirige vers la page de login
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
}