export const formatPagination = (page, perPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / perPage);
  
    return {
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  };
  