import { useState } from 'react';
import { register } from '../services/api';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, password });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}