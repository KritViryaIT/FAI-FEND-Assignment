// DisplayFields.js
import React from 'react';
import { useSelector } from 'react-redux';

const DisplayFields = () => {
  const role = useSelector((state) => state.role);
  const fields = useSelector((state) => state.fields);

  return (
    <div>
      <h2 className='display'>Display Fields for {role}</h2>
      {fields.map((field, index) => (
        <div key={index}>
          <strong>Field Name:</strong> {field.name} <br />
          <strong>Field Type:</strong> {field.type} <br />
          {field.dataType === 'Number' && (
            <>
              <strong>Field Validation:</strong> {field.validation} <br />
            </>
          )}
          <strong>Field Data:</strong>
          {field.dataType === 'Drop-Down' ? (
            <>
              <select>
                {field.data.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
              <br />
            </>
          ) : (
            <>
              {field.data}
              <br />
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DisplayFields;
