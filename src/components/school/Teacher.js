import React, { useState, useEffect } from "react";
import styles from "./TeacherSchool.module.css";

function TeacherSchool({ schoolId }) {
    const [Teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTeacher() {
            try {
                const response = await fetch(`/api/schools/${schoolId}/Teacher`);
                if (!response.ok) {
                    throw new Error('Директор не знайдений');
                }
                const data = await response.json();
                setTeacher(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (schoolId) {
            fetchTeacher();
        }
    }, [schoolId]);

    if (loading) {
        return (
            <section id="Teacher" className={styles.teacher}>
                <h2>Наш директор</h2>
                <div className={styles.teacherCard}>
                    <img src="/school_test/director.jpg" alt="Teacher" className={styles.teacherImage} />
                    <p>
                        Біографія: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida tellus ac ipsum porta mollis. Etiam vulputate fermentum augue at varius. Nullam euismod felis sed risus mattis pulvinar.
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="Teacher" className={styles.teacher}>
                <h2>Наш директор</h2>
                <div className={styles.teacherCard}>
                    <img src="/school_test/Teacher.jpg" alt="Teacher" className={styles.teacherImage} />
                    <p>
                        Біографія: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida tellus ac ipsum porta mollis. Etiam vulputate fermentum augue at varius. Nullam euismod felis sed risus mattis pulvinar.
                    </p>
                </div>
            </section>
        );
    }

    if (!Teacher) {
        return <p>Інформація про директора відсутня.</p>;
    }

    return (
        <section id="Teacher" className={styles.teacher}>
            <h2>Наш директор</h2>
            <div className={styles.teacherCard}>
                <img src={Teacher.photo_url} alt={Teacher.name} className={styles.teacherImage} />
                <p><strong>Ім'я:</strong> {Teacher.name}</p>
                <p>{Teacher.bio}</p>
            </div>
        </section>
    );
}

export default TeacherSchool;
