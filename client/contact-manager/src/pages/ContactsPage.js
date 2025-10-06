import { useEffect, useState } from 'react';
import { getContacts } from '../services/api';
import ContactForm from '../components/ContactForm';
import Logout from '../components/Logout';
import { useNavigate } from 'react-router-dom';
import { deleteContact } from '../services/api';
import { updateContact } from '../services/api';

export default function ContactsPage() {
  const navigate = useNavigate();
  const [editingContact, setEditingContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        await updateContact(editingContact._id, editingContact, token);
        setEditingContact(null);
        fetchContacts();
      } catch (err) {
        console.error('Erreur modification:', err);
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
          <li key={c._id} className="contact-list">
            <strong>{c.firstName}</strong> – {c.lastName} - {c.phone}
            <button onClick={() => setEditingContact(c)} style={{ marginLeft: '1rem' }}>✏️</button>
            <button onClick={() => handleDelete(c._id)} style={{ marginLeft: '1rem' }}>
            🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
