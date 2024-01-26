// reducers.js
const initialState = {
    role: '',
    fields: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ROLE':
        return {
          ...state,
          role: action.payload,
        };
      case 'ADD_FIELD':
        return {
          ...state,
          fields: [...state.fields, action.payload],
        };
      case 'CLEAR_FIELDS':
        return {
          ...state,
          fields: [],
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  