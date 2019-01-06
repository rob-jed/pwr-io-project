import { API } from '../';

function getEmployee(id) {
  return API.get(`/get_employee_info/${id}`);
}

export default getEmployee;
