import Cookie from 'js-cookie';

function logOut() {
  Cookie.remove('io_app_token');
}

export default logOut;
