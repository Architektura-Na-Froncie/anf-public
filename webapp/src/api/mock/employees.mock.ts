import { rest } from 'msw';

import { BASE_URL } from "env/config";
import { Employee } from "api/employees";

import mockJSON from "./employees.mock.json"
export const employeesJSON = mockJSON as Employee[]

export const employeesMockHandlers = [
  rest.get<never, never, Employee[]>(`${BASE_URL}/employees`, async (req, res, ctx) => {
    return res(
      ctx.json(employeesJSON),
    )
  }),
]
