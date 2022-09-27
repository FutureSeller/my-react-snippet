export function paginate<T>(array: T[], page: number, perPage: number) {
  return array.slice((page - 1) * perPage, page * perPage);
}

export function getPrevPage(page: number, perPage: number) {
  if (page <= 1) {
    return 1;
  }

  return page - 1;
}

export function getNextPage(page: number) {}

export function getTotalPages(perPage: number, length: number) {
  return Math.ceil(length / perPage);
}
