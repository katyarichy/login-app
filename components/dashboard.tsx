'use client';

import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const columnDefs = [
    {
      headerName: 'Catalog Description',
      field: 'CatalogDescription',
      flex: 1,
      minWidth: 150,
    },
    { headerName: 'Item Code', field: 'ItemCode', flex: 1, minWidth: 100 },
    { headerName: 'Sales Price', field: 'SalesPrice', flex: 1, minWidth: 100 },
    {
      headerName: 'Stock',
      field: 'LastAvailableStock',
      flex: 1,
      minWidth: 100,
    },
  ];

  const [paginationPageSize] = useState(30);
  const [paginationPageSizeOptions] = useState([30, 60, 90]);

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
    <div style={{ height: '100vh', width: '100vw' }}>
      <div
        className='ag-theme-alpine'
        style={{ height: '100%', width: '100%' }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeOptions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
