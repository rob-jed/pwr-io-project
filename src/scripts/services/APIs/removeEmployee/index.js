import { API } from '../';

function removeEmployee(id) {
  return API.delete('/remove_employee', {
    employee_id: id,
  });
}

export default removeEmployee;
