// RoleSelector.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../redux/actions';

const RoleSelector = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);

  const handleRoleChange = (e) => {
    dispatch(setRole(e.target.value));
  };

  return (
    <div>
      <label>Select Role:</label>
      <select value={role} onChange={handleRoleChange}>
        <option value="">Select Role</option>
        <option value="Student">Student</option>
        <option value="Self-Employee">Self-Employee</option>
        <option value="Business">Business</option>
      </select>
    </div>
  );
};

export default RoleSelector;
