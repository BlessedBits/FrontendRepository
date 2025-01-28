import React, { useState, useEffect } from "react";
import style from "./CourseList.module.css";
import CourseItem from "./CourseItem";
import NewCourseModal from "./NewCourseModal";
import buttonStyles from "./Buttons.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserCourses, createCourse } from "../../api/course";


function CourseList({ user_id, isTeacher }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [editThemeId, setEditThemeId] = useState(null);
  const [themeEditData, setThemeEditData] = useState({
    name: "",
    description: "",
    homework: "",
    links: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  // Fetch user courses
  useEffect(() => {
    async function fetchCourseList() {
      try {
        const courses = await getUserCourses(axiosPrivate);
        setCourseList(courses);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourseList();
  }, []);

  const handleAddCourse = async (courseName) => {
    try {
      const result = await createCourse(courseName, axiosPrivate);
      console.log(result); // Log success message
      const updatedCourses = await getUserCourses();
      setCourseList(updatedCourses);
    } catch (err) {
      console.error("Failed to create course:", err.message);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Завантаження даних...</p>;
  if (error) return <p>Помилка завантаження: {error}</p>;

  return (
    <div className={style.courses}>
      <h1 className={style.title}>Мої курси:</h1>
      <div className={style.list}>
        {courseList.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            isTeacher={isTeacher}
            selectedCourseId={selectedCourseId}
            selectedThemeId={selectedThemeId}
            editThemeId={editThemeId}
            themeEditData={themeEditData}
            setSelectedCourseId={setSelectedCourseId}
            setSelectedThemeId={setSelectedThemeId}
            setEditThemeId={setEditThemeId}
            setThemeEditData={setThemeEditData}
            setCourseList={setCourseList}
          />
        ))}
      </div>
      {isTeacher && (
        <button className={buttonStyles.button} onClick={() => setIsModalOpen(true)}>
          Додати курс
        </button>
      )}
      {isModalOpen && (
        <NewCourseModal
          onClose={() => setIsModalOpen(false)}
          onAddCourse={handleAddCourse}
        />
      )}
    </div>
  );
}

export default CourseList;
