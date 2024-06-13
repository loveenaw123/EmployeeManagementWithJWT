// src/components/EmployeeList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:9092/api/employees', {
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response;
        if (response.status === 200) {
          setEmployees(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  const handleDelete = async (id) => {

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:9092/api/employees/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.response?.data?.message || error.message);
    }
  };

  if (!employees) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div>
      <h2>Welcome!</h2>
      <h2>Employee List</h2>
      </div>

      <div>
      {selectedEmployee && (
        <EmployeeForm
          employee={selectedEmployee}
          setEmployee={setSelectedEmployee}
          fetchEmployees={fetchEmployees}
        />
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setSelectedEmployee({ id: null, name: '', department: '', salary: '' })}
      >
        Add Employee
      </button>
    </div>


    
  );
};

export default EmployeeList;