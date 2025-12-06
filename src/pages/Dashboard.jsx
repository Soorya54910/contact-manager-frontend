// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsAuthenticated }) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch contacts
  const getContacts = async () => {
    try {
      const res = await API.get("/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add or update contact
  const saveContact = async () => {
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await API.put(`/api/contacts/${editingId}`, { name, email, phone });
        setEditingId(null);
      } else {
        await API.post("/api/contacts", { name, email, phone });
      }

      setName("");
      setEmail("");
      setPhone("");
      getContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to save contact");
    }
  };

  // Edit contact
  const editContact = (contact) => {
    setEditingId(contact._id);
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await API.delete(`/api/contacts/${id}`);
      getContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete contact");
    }
  };

  // ✅ LOGOUT (UNCHANGED LOGIC)
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    getContacts();
  }, []);

return (
  <div className="min-h-screen bg-[#0f0f0f] p-4 sm:p-6 text-white">
    <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-4 sm:p-6 rounded-xl shadow-lg">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-600 w-full sm:w-auto px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="mb-6 grid grid-cols-1 gap-3">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-[#0f0f0f] border border-gray-600 focus:outline-none"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-[#0f0f0f] border border-gray-600 focus:outline-none"
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 rounded bg-[#0f0f0f] border border-gray-600 focus:outline-none"
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={saveContact}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
          >
            {editingId ? "Update Contact" : "Add Contact"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setName("");
                setEmail("");
                setPhone("");
              }}
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 w-full sm:w-auto"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table (scrollable on mobile) */}
      {contacts.length === 0 ? (
        <p className="text-gray-400 text-center">No contacts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-500 text-sm sm:text-base">
            <thead className="bg-[#222]">
              <tr>
                <th className="p-2 border border-gray-500">Name</th>
                <th className="p-2 border border-gray-500">Email</th>
                <th className="p-2 border border-gray-500">Phone</th>
                <th className="p-2 border border-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id} className="text-center">
                  <td className="p-2 border border-gray-500">{c.name}</td>
                  <td className="p-2 border border-gray-500">{c.email}</td>
                  <td className="p-2 border border-gray-500">{c.phone}</td>
                  <td className="p-2 border border-gray-500 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => editContact(c)}
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteContact(c._id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

};

export default Dashboard;
