import React, { useState, useEffect } from "react";
import { getAllClasses } from "../../api/class";
import { getAllSchools, createSchool } from "../../api/school";
import { getAllSchedules, updateScheduleById } from "../../api/schedule";
import Notification from "../basic/Notification";
import { Loading } from "../basic/LoadingAnimation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newSchoolName, setNewSchoolName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const schoolsData = await getAllSchools(axiosPrivate);
                const classesData = await getAllClasses(axiosPrivate);
                const schedulesData = await getAllSchedules(axiosPrivate);

                setSchools(schoolsData);
                setClasses(classesData);
                setSchedules(schedulesData);
            } catch (err) {
                console.error("Помилка завантаження даних:", err);
                setError("Не вдалося завантажити дані");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosPrivate]);

    const handleCreateSchool = async () => {
        if (!newSchoolName) return;
        try {
            const newSchool = await createSchool(newSchoolName, axiosPrivate);
            setSchools([...schools, newSchool]);
            setNewSchoolName("");
            setMessage("Школу успішно додано!");
        } catch (err) {
            console.error("Помилка створення школи:", err);
            setMessage("Не вдалося створити школу.");
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Адмін-панель</h2>

            {/* Повідомлення */}
            {message && <Notification message={message} />}

            {/* Список шкіл */}
            <section>
                <h3>Школи</h3>
                <ul>
                    {schools.map(school => (
                        <li key={school.id}>{school.name}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newSchoolName}
                    onChange={(e) => setNewSchoolName(e.target.value)}
                    placeholder="Назва школи"
                />
                <button onClick={handleCreateSchool}>Додати школу</button>
            </section>

            {/* Список класів */}
            <section>
                <h3>Класи</h3>
                <ul>
                    {classes.map(cls => (
                        <li key={cls.id}>{cls.name}</li>
                    ))}
                </ul>
            </section>

            {/* Список розкладів */}
            <section>
                <h3>Розклади</h3>
                <ul>
                    {schedules.map(schedule => (
                        <li key={schedule.id}>{schedule.class} - {schedule.time}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminPanel;
