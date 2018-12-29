import Cookie from 'js-cookie';

function createLoggedInCookie(token) {
  if (!token) {
    return null;
  }

  Cookie.set('io_app_token', token);
}

export default createLoggedInCookie;
