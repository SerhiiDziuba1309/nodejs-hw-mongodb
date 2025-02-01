export const parsePagination = (query) => {
    let page = parseInt(query.page);
    let perPage = parseInt(query.perPage);
  
    // Проверяем, являются ли значения числовыми
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(perPage) || perPage < 1) perPage = 10;
  
    // Ограничиваем максимальное количество элементов на странице
    perPage = Math.min(perPage, 100);
  
    return { page, perPage };
  };
  