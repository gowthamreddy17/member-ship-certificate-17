// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import AddCourse from './AddCourse';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await supabase.from('users').select('*');
      const { data: coursesData } = await supabase.from('courses').select('*');
      setUsers(usersData);
      setCourses(coursesData);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.full_name} ({user.email})</li>
        ))}
      </ul>
      <h3>Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.course_name}</li>
        ))}
      </ul>
      <AddCourse />
    </div>
  );
};

export default AdminDashboard;
