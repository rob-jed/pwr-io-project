function getChunk(name) {
  switch (name) {
  case '/':
    return import('scenes/MainItemsList');
  case 'login':
    return import('scenes/LoginPage');
  default:
    return null;
  }
}

export default getChunk;
