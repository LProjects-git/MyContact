import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="container">
      <h2>Login</h2>
        <img src="/user.png" alt="User" className="user"/>
      <LoginForm />
    </div>
  );
}