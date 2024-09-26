// src/components/AddCourse.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('courses')
      .insert([{ course_name: courseName, course_description: courseDescription }]);

    if (error) {
      alert('Error adding course');
    } else {
      alert('Course added successfully');
      console.log(data)
      setCourseName('');
      setCourseDescription('');
    }
  };
  

  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <textarea
          placeholder="Course Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          required
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
