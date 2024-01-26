// AddFields.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addField, clearFields } from '../redux/actions';

const AddFields = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);
  const fields = useSelector((state) => state.fields);

  const [newField, setNewField] = useState({
    name: '',
    type: 'Text Box',
    dataType: 'String',
    data: '', // Field Data
    maxLength: '', // New property for String data type
    minDate: '', // New property for Date data type
    maxDate: '', // New property for Date data type
  });

  const handleAddField = () => {
    if (fields.length < 4) {
      // Validate Field Data for Number data type
      if (newField.dataType === 'Number' && newField.maxLength && newField.data) {
        const maxDataLength = parseInt(newField.maxLength, 10);
        const inputData = newField.data;
  
        if (inputData.length <= maxDataLength && /^\d+$/.test(inputData)) {
          dispatch(addField(newField));
          setNewField({
            name: '',
            type: 'Text Box',
            dataType: 'String',
            data: '',
            maxLength: '',
            minDate: '',
            maxDate: '',
          });
          return;
        } else {
          alert('Field Data must be a valid number with the specified length.');
          return;
        }
      }
  
      // Validate Field Data for String data type
      if (newField.dataType === 'String' && newField.maxLength && newField.data) {
        const maxDataLength = parseInt(newField.maxLength, 10);
        const inputData = newField.data;
  
        if (inputData.length <= maxDataLength) {
          dispatch(addField(newField));
          setNewField({
            name: '',
            type: 'Text Box',
            dataType: 'String',
            data: '',
            maxLength: '',
            minDate: '',
            maxDate: '',
          });
          return;
        } else {
          alert('Field Data must have a length within the specified range.');
          return;
        }
      }
      if (newField.dataType === 'Drop-Down' && newField.data) {
        const dropdownOptions = newField.data.split(';').map((option) => option.trim());
        dispatch(addField({ ...newField, data: dropdownOptions }));
        setNewField({
          name: '',
          type: 'Text Box',
          dataType: 'String',
          data: [], // Ensure data is always an array
          maxLength: '',
          minDate: '',
          maxDate: '',
        });
        return;
      }
  
      // Validate Field Data for Date data type
      if (newField.dataType === 'Date' && newField.minDate && newField.maxDate && newField.data) {
        const minDate = new Date(newField.minDate);
        const maxDate = new Date(newField.maxDate);
        const inputData = new Date(newField.data);
  
        if (isNaN(inputData.getTime()) || inputData < minDate || inputData > maxDate) {
          alert('Field Data must be a valid date within the specified range.');
          return;
        }
      }
  
      dispatch(addField(newField));
      setNewField({
        name: '',
        type: 'Text Box',
        dataType: 'String',
        data: '',
        maxLength: '',
        minDate: '',
        maxDate: '',
      });
    } else {
      alert('You can add a maximum of 4 fields.');
    }
  };









  


  const handleClearFields = () => {
    dispatch(clearFields());
  };

  const handleTypeChange = (e) => {
    setNewField({ ...newField, type: e.target.value });
  };

const handleDataTypeChange = (e) => {
  const selectedDataType = e.target.value;
  const dataType = newField.type === 'Drop-Down' ? 'Drop-Down' : selectedDataType;
  setNewField({ ...newField, dataType, data: '' });
};

  

  const renderFieldDataInput = () => {
    let inputField = null;
    let constraintsField = null;

    if (newField.dataType === 'Number') {
      constraintsField = (
        <div>
          <label>Maximum Length:</label>
          <input
            type="text"
            value={newField.maxLength}
            onChange={(e) => setNewField({ ...newField, maxLength: e.target.value })}
          />
        </div>
      );

      inputField = (
        <div>
          <label>Field Data:</label>
          <input
            type="text"
            value={newField.data}
            onChange={(e) => {
              const inputData = e.target.value.replace(/[^0-9]/g, ''); // Allow only numeric input
              if (inputData.length <= parseInt(newField.maxLength, 10)) {
                setNewField({ ...newField, data: inputData });
              }
            }}
          />
        </div>
      );
    }

    // Validate Field Data for String data type
    if (newField.dataType === 'String') {
      constraintsField = (
        <div>
          <label>Maximum Length:</label>
          <input
            type="text"
            value={newField.maxLength}
            onChange={(e) => setNewField({ ...newField, maxLength: e.target.value })}
          />
        </div>
      );

      inputField = (
        <div>
          <label>Field Data:</label>
          <input
            type="text"
            value={newField.data}
            onChange={(e) => {
              const inputData = e.target.value;
              if (inputData.length <= parseInt(newField.maxLength, 10)) {
                setNewField({ ...newField, data: inputData });
              }
            }}
          />
        </div>
      );
    }

    // For Drop-Down field type
    if (newField.type === 'Drop-Down') {
      constraintsField = (
        <div>
          <label>Field Data:</label>
          <textarea
            value={newField.data}
            onChange={(e) => setNewField({ ...newField, data: e.target.value })}
            rows="3"
          ></textarea>
          <small>Enter comma-separated values for dropdown options.</small>
        </div>
      );

      inputField = null; // No input field for Drop-Down
    }
    if (newField.dataType === 'Date') {
      constraintsField = (
        <div>
          <label>Minimum Date:</label>
          <input
            type="date"
            value={newField.minDate}
            onChange={(e) => setNewField({ ...newField, minDate: e.target.value })}
          />
          <label>Maximum Date:</label>
          <input
            type="date"
            value={newField.maxDate}
            onChange={(e) => setNewField({ ...newField, maxDate: e.target.value })}
          />
        </div>
      );

      inputField = (
        <div>
          <label>Field Data:</label>
          <input
            type="date"
            value={newField.data}
            onChange={(e) => setNewField({ ...newField, data: e.target.value })}
          />
        </div>
      );
    }

    return (
      <div>
        {constraintsField}
        {inputField}
      </div>
    );
  };

  return (
    <div>
      <h2 className='addfield'>Add Fields</h2>
      <div>
        <label>Select Role:</label>
        <strong>{role}</strong>
      </div>
      <div>
        <label>Field Name:</label>
        <input className='input-container'
          type="text"
          value={newField.name}
          onChange={(e) => setNewField({ ...newField, name: e.target.value })}
        />
      </div>
      <div>
        <label>Field Type:</label>
        <select value={newField.type} onChange={handleTypeChange}>
          <option value="Text Box">Text Box</option>
          <option value="Drop-Down">Drop-Down</option>
          <option value="Date">Date</option>
        </select>
      </div>
      <div>
        <label>Field Data Type:</label>
        <select value={newField.dataType} onChange={handleDataTypeChange}>
          <option value="Number">Number</option>
          <option value="String">String</option>
          <option value="Date">Date</option>
          <option value="Drop-Down">Drop-Down</option>
        </select>
      </div>
{renderFieldDataInput()}
<button onClick={handleAddField} className='button-40' >Add Field</button>
<button onClick={handleClearFields} className='button-40 clear'>Clear Fields</button>
</div>
);
};

export default AddFields;