export const parseFilters = (query) => {
    const allowedTypes = ['work', 'personal', 'other'];
  
    let filters = {};
  
    
    if (query.type && allowedTypes.includes(query.type)) {
      filters.contactType = query.type;
    }
  
    
    if (query.isFavourite !== undefined) {
      filters.isFavourite = query.isFavourite === 'true';
    }
  
    return filters;
  };
  