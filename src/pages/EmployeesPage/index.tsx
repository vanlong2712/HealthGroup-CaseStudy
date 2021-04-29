import React, { useState } from "react";
import "./styles.css";
import { Button, Col, Modal, Row, Table } from "antd";
import {
  EmployeeType,
  useGetEmployees,
  useDeleteEmployee,
} from "../../services/employees";
import ModalAddEmployee from "./components/ModalAddEmployee";

const EmployeesPage = () => {
  const [visible, setVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({} as EmployeeType);

  //services
  const { data, isLoading } = useGetEmployees();
  const deleteEmployee = useDeleteEmployee();

  const _delete = (employee: EmployeeType) => {
    Modal.confirm({
      title: "Delete Employee",
      content: `Are you sure you want to delete ${employee.name}?`,
      okText: "Delete",
      onOk: () => {
        return new Promise((resolve, reject) => {
          deleteEmployee.mutate(employee, {
            onSuccess: () => {
              resolve(true);
            },
            onError: () => {
              reject();
            },
          });
        });
      },
    });
  };

  const columns: any[] = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Position", dataIndex: "position" },
    {
      title: "",
      width: 200,
      render: (_: any, item: EmployeeType) => (
        <Row gutter={[10, 0]}>
          <Col>
            <Button
              type="link"
              onClick={() => {
                setSelectedEmployee(item);
                setVisible(true);
              }}
            >
              Edit
            </Button>
          </Col>
          <Col>
            <Button type="link" onClick={() => _delete(item)}>
              Delete
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

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
      <ModalAddEmployee
        visible={visible}
        onCancel={() => setVisible(false)}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    </div>
  );
};

export default EmployeesPage;
