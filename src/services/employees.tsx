import axios from "./axios";

export interface EmployeeType {
  id: string;
  name: string;
  email: string;
  position: string;
}

export const getEmployees = () => {
  return axios.get("/employees").then((res) => res.data);
};

export const addEmployees = (employees: EmployeeType) => {
  return axios.post("/employees", employees).then((res) => res.data);
};
