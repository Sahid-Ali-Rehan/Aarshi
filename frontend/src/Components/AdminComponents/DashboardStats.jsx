import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Optional, to add default styles

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

// Register necessary components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const DashboardStats = () => {
  const [donutData, setDonutData] = useState(null);  // Initially null to indicate loading
  const [lineData, setLineData] = useState(null);    // Initially null to indicate loading

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://aarshi.onrender.com/api/dashboard/stats');
        const data = await response.json();
        
        console.log("Fetched Data:", data);  // Debugging - check the structure of fetched data

        if (data) {
          const { orders, products, users, salesData } = data;

          setDonutData({
            labels: ['Orders', 'Products', 'Users'],
            datasets: [
              {
                data: [orders, products, users],
                backgroundColor: ['#D4AF37', '#D2C385', '#bb9e8c'],  // Gold shades
                hoverBackgroundColor: ['#D2C385', '#D4AF37', '#996a6c'],  // Hover effect with golden hues
              },
            ],
          });

          setLineData({
            labels: salesData.months,
            datasets: [
              {
                label: 'Sales',
                data: salesData.values,
                borderColor: '#D4AF37',  // Gold-colored border for sales data line
                fill: true,
                backgroundColor: 'rgba(212, 175, 55, 0.2)', // Light golden fill for sales trend
                pointBackgroundColor: '#D4AF37', // Gold-colored points
                pointBorderColor: '#996a6c', // Darker border for points
              },
            ],
          });
        } else {
          console.error("No data returned from API.");
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // Display skeleton loaders while fetching data
  if (!donutData || !lineData) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#FFF8E7] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <Skeleton height={200} /> {/* Skeleton loader for the donut chart */}
        </div>
        <div className="bg-[#FFF8E7] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Sales Trend</h3>
          <Skeleton height={200} /> {/* Skeleton loader for the line chart */}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-[#FFF8E7] p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Overview</h3>
        <Doughnut data={donutData} />
      </div>
      <div className="bg-[#FFF8E7] p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Sales Trend</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default DashboardStats;
