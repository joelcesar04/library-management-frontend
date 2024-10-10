import React from 'react';
import { Button, Table } from 'antd'; 
import { PlusOutlined } from '@ant-design/icons'; 
import './TableList.css'
import { Link } from 'react-router-dom';


const TableList = ({ title, link, columns, registros, addButton }) => {
  return (
    <>
      <div className="table-container">
        <h1>{title}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginTop: "20px" }}
        >
          <Link to={link}>{addButton}</Link>
        </Button>
        <Table
          columns={columns}
          dataSource={registros}
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
};

export default TableList