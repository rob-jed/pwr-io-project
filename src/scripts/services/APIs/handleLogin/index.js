import { API } from '../';

function handleLogin(email, password) {
  return API.post('/login', {
    email,
    password,
  });
}

export default handleLogin;
