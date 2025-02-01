export const parseSort = (query) => {
    const allowedFields = ['name', 'phoneNumber', 'createdAt', 'updatedAt'];
    const allowedOrders = ['asc', 'desc'];
  
    let sortBy = query.sortBy;
    let sortOrder = query.sortOrder;
  
    
    if (!allowedFields.includes(sortBy)) {
      sortBy = 'name'; 
    }
  

    sortOrder = allowedOrders.includes(sortOrder) ? sortOrder : 'asc';
  
    return { sortBy, sortOrder };
  };
  