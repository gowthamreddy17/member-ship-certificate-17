// src/components/CoursePage.js
import React from "react";
import { jsPDF } from "jspdf";
import { supabase } from "../supabaseClient";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams();
  const courseName = "Example Course"; // You can fetch this based on courseId if needed.

  const generatePDF = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No user is logged in");
      return;
    }

    const { data, error } = await supabase
      .from("certificates")
      .insert([
        {
          user_id: user.id,
          course_id: courseId,
          certificate_title: `Certificate for ${user.full_name}`,
          issue_date: new Date(),
        },
      ]);

    if (error) {
      alert("Error generating certificate");
    } else {
      console.log(data);
      // Generate the PDF
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("Gowtham eLearnings", 105, 30, { align: "center" });
      doc.setFontSize(18);
      doc.text(`Certificate of Completion`, 105, 50, { align: "center" });
      doc.setFontSize(14);
      doc.text(`This is to certify that`, 105, 70, { align: "center" });
      doc.setFontSize(16);
      doc.text(`${user.full_name}`, 105, 90, { align: "center" });
      doc.setFontSize(14);
      doc.text(`has successfully completed the course`, 105, 110, {
        align: "center",
      });
      doc.setFontSize(16);
      doc.text(`${courseName}`, 105, 130, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 150, {
        align: "center",
      });

      // Save the PDF
      doc.save(`Certificate_${user.full_name}_${courseName}.pdf`);
    }
  };

  return (
    <div className="course-page">
      <h1>{courseName}</h1>
      <p>Course details...</p>
      <button onClick={generatePDF}>Enroll & Generate Certificate</button>
    </div>
  );
};

export default CoursePage;
