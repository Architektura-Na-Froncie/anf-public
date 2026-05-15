import { getEmployees } from "api/employees";
import { Dispatch } from "redux";
import { fetchEmployeesFailure, fetchEmployeesRequest, fetchEmployeesSuccess } from "./actions";

export const fetchEmployeesThunk = (page = 1) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchEmployeesRequest())
    return getEmployees()
      .then(employees => dispatch(fetchEmployeesSuccess(employees, page)))
      .catch(reason => dispatch(fetchEmployeesFailure(reason)))
  };
}
