import { message } from "antd";
import { useMutation, useQuery } from "react-query";
import axios from "./axios";
import queryClient from "./queryClient";

export interface EmployeeType {
  id: string;
  name: string;
  email: string;
  position: string;
}

export const useGetEmployees = () => {
  return useQuery("employees", () =>
    axios.get("/employees").then((res) => res.data)
  );
};

export const useAddEmployee = () => {
  return useMutation(
    (employee: EmployeeType) =>
      axios.post("/employees", employee).then((res) => res.data),
    {
      onSuccess: () => {
        message.success({ content: "Add employee successfully!" });
        queryClient.invalidateQueries("employees");
      },
    }
  );
};

export const useUpdateEmployee = () => {
  return useMutation(
    (employee: EmployeeType) =>
      axios.put(`/employees/${employee.id}`, employee).then((res) => res.data),
    {
      onSuccess: () => {
        message.success({ content: "Update employee successfully!" });
        queryClient.invalidateQueries("employees");
      },
    }
  );
};

export const useDeleteEmployee = () => {
  return useMutation(
    (employee: EmployeeType) =>
      axios.delete(`/employees/${employee.id}`).then((res) => res.data),
    {
      onSuccess: () => {
        message.success({ content: "Delete employee successfully!" });
        queryClient.invalidateQueries("employees");
      },
    }
  );
};
