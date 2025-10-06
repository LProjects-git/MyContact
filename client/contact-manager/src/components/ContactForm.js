import { useState } from 'react';
import { addContact } from '../services/api';

export default function ContactForm({ onContactCreated }) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addContact({ firstName, lastName, phone }, localStorage.getItem('token'));
      alert('Contact created');
      setfirstName('');
      setlastName('');
      setPhone('');
      onContactCreated(); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error');
    }
  };

return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}