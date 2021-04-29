import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { Button, Table } from "antd";
import { EmployeeType, useGetEmployees } from "../../services/employees";
import ModalAddEmployee from "./components/ModalAddEmployee";

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Position", dataIndex: "position" },
];

const EmployeesPage = () => {
  const [visible, setVisible] = useState(false);

  //services
  const { data, isLoading } = useGetEmployees();

  return (
    <div className="employees-page">
      <div className="employees-page-add-btn">
        <Button type="primary" onClick={() => setVisible(true)}>
          Add
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        loading={isLoading}
      />
      <ModalAddEmployee visible={visible} onCancel={() => setVisible(false)} />
    </div>
  );
};

export default EmployeesPage;
