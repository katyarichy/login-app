'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const parseDate = (date: any) => {
  return new Date(date.value).toLocaleDateString('en-GB');
};

const Dashboard = () => {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  const getColumnDefs = () => {
    let columns = [
      { headerName: 'Item', field: 'ItemCode', flex: 1, minWidth: 100 },
      {
        headerName: 'Description',
        field: 'CatalogDescription',
        flex: 1,
        minWidth: 150,
      },
      {
        headerName: 'Created',
        field: 'Created',
        flex: 1,
        minWidth: 100,
        valueFormatter: parseDate,
      },
    ];

    if (role === 'Administrator') {
      columns = [
        ...columns,
        {
          headerName: 'Stock',
          field: 'LastAvailableStock',
          flex: 1,
          minWidth: 100,
        },
        {
          headerName: 'Sales Price',
          field: 'SalesPrice',
          flex: 1,
          minWidth: 100,
        },
      ];
    }

    return columns;
  };

  const paginationPageSize = 30;
  const paginationPageSizeOptions = [30, 60, 90];

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

    const userRole = Cookies.get('role');
    setRole(userRole || 'User');

    fetchData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    router.push('/login');
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div className='flex justify-between items-center p-4 bg-gray-100'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <button
          onClick={handleLogout}
          className='bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out'
        >
          Logout
        </button>
      </div>
      <div
        className='ag-theme-alpine'
        style={{ height: 'calc(100% - 72px)', width: '100%' }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={getColumnDefs()}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeOptions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
