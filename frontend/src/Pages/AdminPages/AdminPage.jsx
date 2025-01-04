import React from 'react';
import Sidebar from '../../Components/AdminComponents/Sidebar';
import DashboardStats from '../../Components/AdminComponents/DashboardStats';


const AdminPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#ffdf99] p-6 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6 text-[#D4AF37]">Dashboard</h2>
        <DashboardStats />
      </div>
    </div>
  );
};

export default AdminPage;
