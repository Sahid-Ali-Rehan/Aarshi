import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://aarshi.onrender.com/api/users/fetch-users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const changeRole = async (id) => {
    try {
      await axios.put(`https://aarshi.onrender.com/api/users/role/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Re-fetch users after role change
      const res = await axios.get('https://aarshi.onrender.com/api/users/fetch-users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data); // Update users state with the fresh data
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  const deleteUser = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    
    if (!isConfirmed) {
      return; // If the user cancels the deletion, exit the function
    }
  
    try {
      await axios.delete(`https://aarshi.onrender.com/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      // Re-fetch users after delete
      const res = await axios.get('https://aarshi.onrender.com/api/users/fetch-users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data); // Update users state with the fresh data
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto p-8 bg-[#FAEED5] w-full h-screen">
      <table className="min-w-full border-collapse bg-[#f4ebb4] border border-[#a0926c] shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#D4AF37] text-white">
            <th className="border-b px-4 py-2">User ID</th> {/* Added User ID */}
            <th className="border-b px-4 py-2">Username</th>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">Role</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.uid} className="hover:bg-[#D2C385]">
              <td className="border-b px-4 py-2">{user.uid}</td> {/* Displaying User ID */}
              <td className="border-b px-4 py-2">{user.username}</td>
              <td className="border-b px-4 py-2">{user.email}</td>
              <td className="border-b px-4 py-2">{user.role}</td>
              <td className="border-b px-4 py-2">
                <button
                  onClick={() => changeRole(user.uid)}
                  className="bg-[#D4AF37] text-white px-4 py-2 rounded hover:bg-[#B48A2E] transition duration-200"
                >
                  Change Role
                </button>
                <button
                  onClick={() => deleteUser(user.uid)}
                  className="bg-[#B74E4E] text-white px-4 py-2 rounded ml-2 hover:bg-[#9B3838] transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
