import Cookie from 'js-cookie';

function isLoggedIn() {
  return !!Cookie.get('io_app_token');
}

export default isLoggedIn;
