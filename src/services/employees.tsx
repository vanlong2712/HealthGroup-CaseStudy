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
      onSuccess: (data) => {
        queryClient.invalidateQueries("employees");
      },
    }
  );
};
