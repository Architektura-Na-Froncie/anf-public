import axios from "axios"
import { BASE_URL } from "env/config"
import { Money, Nationality, ContractType } from "./types"

export interface Employee {
  "id": number;
  "nationality": Nationality,
  "departmentId": number;
  "keycardId": string;
  "account": string;
  "salary": Money;
  "office": [string, string];
  "firstName": string;
  "lastName": string;
  "title": string;
  "contractType": ContractType;
  "email": string;
  "hiredAt": string;
  "expiresAt": string;
  "personalInfo": {
    "age": number;
    "phone": string;
    "email": string;
    "dateOfBirth": string;
    "address": {
      "street": string;
      "city": string;
      "country": string;
    };
  },
  "skills": string[];
  "bio": string;
}

export const getEmployees = async (page = 1) => {
  const response = await axios.get<Employee[]>(`${BASE_URL}/employees?_page=${page}`)
  return response.data
}

type EmployeeChanges = Pick<Employee, "id" | "salary">

export const updateEmployee = async ({ id, ...changes }: EmployeeChanges) => {
  const response = await axios.patch<void>(`${BASE_URL}/employees/${id}`, changes)
  return response.data
}

export const deleteEmployee = async (id: Employee['id']) => {
  const response = await axios.delete<void>(`${BASE_URL}/employees/${id}`)
  return response.data
}
