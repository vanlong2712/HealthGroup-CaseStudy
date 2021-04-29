import React, { useState } from "react";
import { Form, FormItemProps, Input, message, Modal } from "antd";
import { addEmployees, EmployeeType } from "../../../../services/employees";

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
  handleAddEmployees: Function;
}

const ModalAddEmployee = ({
  visible,
  onCancel,
  handleAddEmployees,
}: ModalAddEmployeeProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    if (loading) return;
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: EmployeeType) => {
    setLoading(true);
    addEmployees(values)
      .then((data) => {
        handleAddEmployees(data);
        message.success({ content: "Employees added successfully!" });
        handleCancel();
      })
      .catch((err) => console.log("err", err.message))
      .finally(() => {
        setLoading(false);
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
      confirmLoading={loading}
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
