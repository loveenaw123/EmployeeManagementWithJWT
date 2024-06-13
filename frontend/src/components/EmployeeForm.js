// src/components/EmployeeForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, setEmployee, fetchEmployees }) => {
  const [formData, setFormData] = useState({ name: '', department: '', salary: '' });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await axios.put(`http://localhost:9092/api/employees/${formData.id}`, formData);
    } else {
      await axios.post('http://localhost:9092/api/employees', formData);
    }
    fetchEmployees();
    setEmployee(null);
  };

  return (
    <div className="container mb-3">
    {/* <div>
      <h2>{formData.id ? 'Edit Employee' : 'Add Employee'}</h2>
    </div> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => setEmployee(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
