function getTitleFromPathname(pathname) {
  const separator = ' / ';
  let title = 'Panel administracyjny';

  switch (pathname) {
  case '/admin/add-client':
    title += `${separator}Dodaj osobę`;
    break;
  case '/admin/add-transaction':
    title += `${separator}Dodaj transakcję`;
    break;
  case '/admin/transactions-list':
    title += `${separator}Lista transakcji`;
    break;
  case '/admin/manage-users':
    title += `${separator}Zarządzaj pracownikami`;
    break;
  case '/admin/add-employee':
    title += `${separator}Dodaj pracownika`;
    break;
  default:
    break;
}

  return title;
}

export default getTitleFromPathname;
