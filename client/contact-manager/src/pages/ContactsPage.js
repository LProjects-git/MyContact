import { useEffect, useState } from 'react';
import { getContacts } from '../services/api';
import ContactForm from '../components/ContactForm';
import Logout from '../components/Logout';
import { useNavigate } from 'react-router-dom';
import { deleteContact } from '../services/api';
import { updateContact } from '../services/api';
import { set } from '../../../../server/app';

export default function ContactsPage() {
  const navigate = useNavigate();
  const [editingContact, setEditingContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editError, setEditError] = useState('');

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await getContacts(token);
      setContacts(res.data);
    } catch (err) {
      console.error('Error', err);
    }};

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteContact(id, token);
      fetchContacts();
    } catch (err) {
      console.log('Contact à modifier:', editingContact);
      console.error('Error deleting contact', err);
  }};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');}
    else {
    fetchContacts();}
  }, []);

  const filteredContacts = contacts.filter((c) => {
    const fullText = `${c.firstName} ${c.lastName} ${c.phone}`;
    return fullText.toLowerCase().includes(searchTerm.toLowerCase());});

  return (
    <div className="container">
      <h2>My Contacts</h2>
      <ContactForm onContactCreated={fetchContacts} />
      {editingContact && (
    <form className="auth-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
      try {
        setEditError('');
        await updateContact(editingContact._id, editingContact, token);
        setEditingContact(null);
        fetchContacts();
      } catch (err) {
        const msg = err.response?.data?.message || 'Erreur inconnue';
        setEditError(msg);
      }
    }}
    >
    <input
      type="text"
      value={editingContact.firstName}
      onChange={(e) =>
        setEditingContact({ ...editingContact, firstName: e.target.value })
      }
    />
    <input
      type="text"
      value={editingContact.lastName}
      onChange={(e) =>
        setEditingContact({ ...editingContact, lastName: e.target.value })
      }
    />
    <input
      type="text"
      value={editingContact.phone}
      onChange={(e) =>
        setEditingContact({ ...editingContact, phone: e.target.value })
      }
    />
    <button type="submit">✅</button>
    <button type="button" onClick={() => setEditingContact(null)}>
      ❌
    </button>
    {editError && <p className="error">{editError}</p>}
  </form>
)}
      <input
        type="text"
        placeholder="🔍 Rechercher un contact..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"/>

      <ul className="contact-list">
        {filteredContacts.map((c) => (
        <div key={c._id} className="contact-card">
            <div className="contact-info">
            <strong>{c.firstName}</strong> – {c.lastName}  
            <p>{c.phone}</p>
        </div>
        <div className="contact-actions">
            <button onClick={() => setEditingContact(c)}>✏️</button>
            <button onClick={() => handleDelete(c._id)}>🗑️</button>
        </div>
        </div>
        ))}
      </ul>
    </div>
  );
}
