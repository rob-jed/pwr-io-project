function getChunk(name) {
  switch (name) {
  case '/':
    return import('scenes/MainItemsList');
  case 'login':
    return import('scenes/LoginPage');
  case 'admin':
    return import('scenes/AdminPage');
  default:
    return null;
  }
}

export default getChunk;
