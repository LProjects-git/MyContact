import { useState } from 'react';
import { addContact } from '../services/api';

export default function ContactForm({ onContactCreated }) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addContact({ firstName, lastName, phone }, localStorage.getItem('token'));
      alert('Contact created');
      setfirstName('');
      setlastName('');
      setPhone('');
      setErrorMessage('');
      onContactCreated(); 
    } catch (err) {
      const msg = err.response?.data?.message || 'Erreur inconnue';
      setErrorMessage(msg);
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
      <button type="submit">Add a contact</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}