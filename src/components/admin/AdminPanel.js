import React, { useState, useEffect } from "react";
import { getAllClasses } from "../../api/class";
import {
    getAllSchools,
    createSchool,
    updateSchoolInfo,
} from "../../api/school";
import { getAllSchedules } from "../../api/schedule";
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
    const [newSchool, setNewSchool] = useState({
        name: "",
        address: "",
        year: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const schoolsData = await getAllSchools(axiosPrivate);
                const classesData = await getAllClasses(axiosPrivate);
                //const schedulesData = await getAllSchedules(axiosPrivate);

                setSchools(schoolsData);
                setClasses(classesData);
                //setSchedules(schedulesData);
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
        if (!newSchool.name || !newSchool.address || !newSchool.year) return;
        try {
            const createdSchool = await createSchool(newSchool, axiosPrivate);
            setSchools([...schools, createdSchool]);
            setNewSchool({ name: "", address: "", year: "" });
            setMessage({ type: "success", text: "Успішно створено" });
        } catch (err) {
            console.error("Помилка створення школи:", err);
            setMessage({ type: "error", text: "Помилка створення школи" });
        }
        setTimeout(() => setMessage(null), 3000);
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Адмін-панель</h2>

            <Notification message={message?.text} type={message?.type} />

            <section>
                <h3>Школи</h3>
                <ul>
                    {schools.map((school) => (
                        <li key={school.id}>
                            {school.name} ({school.address}, {school.year})
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newSchool.name}
                    onChange={(e) =>
                        setNewSchool({ ...newSchool, name: e.target.value })
                    }
                    placeholder="Назва школи"
                />
                <input
                    type="text"
                    value={newSchool.address}
                    onChange={(e) =>
                        setNewSchool({ ...newSchool, address: e.target.value })
                    }
                    placeholder="Адреса"
                />
                <input
                    type="number"
                    value={newSchool.year}
                    onChange={(e) =>
                        setNewSchool({
                            ...newSchool,
                            year: e.target.value,
                        })
                    }
                    placeholder="Рік заснування"
                />
                <button onClick={handleCreateSchool}>Додати школу</button>
            </section>

            <section>
                <h3>Класи</h3>
                <ul>
                    {classes.map((cls) => (
                        <li key={cls.id}>{cls.name}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Розклади</h3>
                <ul>
                    {schedules.map((schedule) => (
                        <li key={schedule.id}>
                            {schedule.class} - {schedule.time}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminPanel;
