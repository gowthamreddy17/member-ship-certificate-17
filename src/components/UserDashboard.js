// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Enrollment from './Enrollment';

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('*');
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <h3>Available Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.course_name}
            <Enrollment courseId={course.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
