import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { Button, Table } from "antd";
import { EmployeeType, getEmployees } from "../../services/employees";
import ModalAddEmployee from "./components/ModalAddEmployee";

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Position", dataIndex: "position" },
];

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([] as EmployeeType[]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployees = useCallback(
    (employee: EmployeeType) => {
      setEmployees([...employees, employee]);
    },
    [employees]
  );

  const fetchEmployees = async () => {
    try {
      const data: EmployeeType[] = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.log("err", err.message);
    }
  };

  return (
    <div className="employees-page">
      <div className="employees-page-add-btn">
        <Button type="primary" onClick={() => setVisible(true)}>
          Add
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={employees}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
      />
      <ModalAddEmployee
        visible={visible}
        onCancel={() => setVisible(false)}
        handleAddEmployees={handleAddEmployees}
      />
    </div>
  );
};

export default EmployeesPage;
