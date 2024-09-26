// src/components/Enrollment.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Enrollment = ({ courseId, courseName }) => {
  const [enrolled, setEnrolled] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No user is logged in");
      return;
    }

    const { data, error } = await supabase
      .from("enrollments")
      .insert([
        { user_id: user.id, course_id: courseId, enrollment_date: new Date() },
      ]);

    if (error) {
      alert("Error enrolling");
    } else {
      console.log(data);
      setEnrolled(true);
      alert("Enrollment successful!");
    }
  };

  const handleViewCourse = () => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div>
      {enrolled ? (
        <button onClick={handleViewCourse}>View Course</button>
      ) : (
        <button onClick={handleEnroll}>Enroll Now</button>
      )}
    </div>
  );
};

export default Enrollment;
