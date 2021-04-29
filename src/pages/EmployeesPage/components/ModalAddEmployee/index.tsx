import React, { useState } from "react";
import { Form, FormItemProps, Input, message, Modal } from "antd";
import { EmployeeType, useAddEmployee } from "../../../../services/employees";

const forms = [
  {
    name: "name",
    label: "Name",
    rules: [{ required: true, message: "Please enter employee name" }],
  },
  {
    name: "email",
    label: "Email",
    rules: [
      { required: true, message: "Please enter employee email" },
      { type: "email", message: "Invalid email" },
    ],
  },
  {
    name: "position",
    label: "Position",
  },
] as FormItemProps[];

interface ModalAddEmployeeProps {
  visible: boolean;
  onCancel: () => any;
}

const ModalAddEmployee = ({ visible, onCancel }: ModalAddEmployeeProps) => {
  const [form] = Form.useForm();

  //services
  const addEmployee = useAddEmployee();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: EmployeeType) => {
    addEmployee.mutate(values, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <Modal
      title="Add Employee"
      visible={visible}
      onCancel={handleCancel}
      centered
      okText="Add"
      onOk={form.submit}
      confirmLoading={addEmployee.isLoading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {forms.map((el, idx) => (
          <Form.Item key={idx} {...el}>
            <Input />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default ModalAddEmployee;
