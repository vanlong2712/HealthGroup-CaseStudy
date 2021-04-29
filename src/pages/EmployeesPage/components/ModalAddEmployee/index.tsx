import React, { useEffect } from "react";
import { Form, FormItemProps, Input, Modal } from "antd";
import {
  EmployeeType,
  useAddEmployee,
  useUpdateEmployee,
} from "../../../../services/employees";

const forms = [
  { name: "id", hidden: true },
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
  selectedEmployee: EmployeeType;
  setSelectedEmployee: Function;
}

const ModalAddEmployee = ({
  visible,
  onCancel,
  selectedEmployee,
  setSelectedEmployee,
}: ModalAddEmployeeProps) => {
  const [form] = Form.useForm();

  const isEdit = !!selectedEmployee.id;

  //services
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({ ...selectedEmployee });
    }
  }, [selectedEmployee]);

  const handleCancel = () => {
    form.resetFields();
    setSelectedEmployee({});
    onCancel();
  };

  const onFinish = (values: EmployeeType) => {
    if (isEdit) {
      return updateEmployee.mutate(values, {
        onSuccess: () => {
          handleCancel();
        },
      });
    }
    addEmployee.mutate(values, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <Modal
      title={isEdit ? "Update Employee" : "Add Employee"}
      visible={visible}
      onCancel={handleCancel}
      centered
      okText={isEdit ? "Update" : "Add"}
      onOk={form.submit}
      confirmLoading={addEmployee.isLoading || updateEmployee.isLoading}
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
