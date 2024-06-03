'use client';

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        if (result?.ArrayOfItem?.Item) {
          setData(result.ArrayOfItem.Item);
        } else {
          console.error('Invalid data structure', result);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.CatalogDescription}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
