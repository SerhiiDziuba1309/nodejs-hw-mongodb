export const parsePagination = (query) => {
    let page = parseInt(query.page);
    let perPage = parseInt(query.perPage);
  
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(perPage) || perPage < 1) perPage = 10;
  
    perPage = Math.min(perPage, 100);
  
    return { page, perPage };
  };
  