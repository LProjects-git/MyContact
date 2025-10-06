import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="container">
      <h2>Register</h2>
      <img src="/user.png" alt="User" className="user"/>
      <RegisterForm />
    </div>
  );
}