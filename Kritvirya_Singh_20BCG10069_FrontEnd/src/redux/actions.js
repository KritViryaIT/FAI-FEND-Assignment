// actions.js
export const setRole = (role) => ({
    type: 'SET_ROLE',
    payload: role,
  });
  
  export const addField = (field) => ({
    type: 'ADD_FIELD',
    payload: field,
  });
  
  export const clearFields = () => ({
    type: 'CLEAR_FIELDS',
  });
  