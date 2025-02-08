import React, { useState, useEffect } from "react";
import style from "./CourseList.module.css";
import CourseItem from "./CourseItem";
import NewCourseModal from "./NewCourseModal";
import buttonStyles from "./Buttons.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserCourses, createCourse } from "../../api/course";
import { Loading } from "../basic/LoadingAnimation";
import { getUserId }  from "../../api/user"

function CourseList({ userRole }) {
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

  // Завантаження списку курсів
  useEffect(() => {
    async function fetchCourseList() {
      try {
        const courses = await getUserCourses(axiosPrivate);
        setCourseList(courses);
      } catch (err) {
        console.error(err.message);
        setError("Не вдалося завантажити курси. Спробуйте пізніше.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourseList();
  }, [axiosPrivate]);


  const handleAddCourse = async (courseName) => {
    try {
      const result = await createCourse(courseName, 3, axiosPrivate);
      console.log("Курс створено:", result);

      setCourseList((prev) => [...prev, result]);
      setIsModalOpen(false); 
    } catch (err) {
      console.error("Не вдалося створити курс:", err.message);
      alert(`Помилка: ${err.message}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className={style.courses}>
      <h1 className={style.title}>Мої курси:</h1>
      <div className={style.list}>
        {courseList.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            userRole={userRole}
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
      {["SCHOOL_ADMIN", "TEACHER"].includes(userRole) && (
        <button
          className={buttonStyles.button}
          onClick={() => setIsModalOpen(true)}
        >
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
