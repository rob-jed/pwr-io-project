function getTitleFromPathname(pathname) {
  const separator = ' / ';
  let title = 'Panel administracyjny';

  switch (pathname) {
  case '/admin/add-client':
    title += `${separator}Dodaj klienta`;
    break;
  case '/admin/add-transaction':
    title += `${separator}Dodaj transakcję`;
    break;
  case '/admin/transactions-list':
    title += `${separator}Lista transakcji`;
    break;
  default:
    break;
}

  return title;
}

export default getTitleFromPathname;
