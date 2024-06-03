'use client';

import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Cookies from 'js-cookie';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  const parseDate = (date: any) => {
    return new Date(date.value).toLocaleDateString('en-GB');
  };

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

    const userRole = Cookies.get('role') ?? null;
    setRole(userRole);

    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div
        className='ag-theme-alpine'
        style={{ height: '100%', width: '100%' }}
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
