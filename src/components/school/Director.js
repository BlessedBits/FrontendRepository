import React, { useState, useEffect } from "react";

function DirectorSchool({ schoolId }) {
    const [director, setDirector] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDirector() {
            try {
                const response = await fetch(`/api/director/${schoolId}`);
                if (!response.ok) {
                    throw new Error('Директор не знайдений');
                }
                const data = await response.json();
                setDirector(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (schoolId) {
            fetchDirector();
        }
    }, [schoolId]);

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if(error){
        //return <p>{error}</p>
        return (
            <section id="director" className="director-component">
                <h2>Наш директор</h2>
                <div className="director-card">
                    <img src="frame-380.png" alt="Director" className="director-image" />
                    <p>
                        Біографія: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida tellus ac ipsum porta mollis. Etiam vulputate fermentum augue at varius. Nullam euismod felis sed risus mattis pulvinar.
                    </p>
                </div>
            </section>
        );
    }

    if (!director) {
        return <p>Інформація про директора відсутня.</p>;
    }

    return (
        <section id="director" className="director-component">
            <h2>Наш директор</h2>
            <div className="director-card">
                <img src={director.photo_url} alt={director.name} className="director-image" />
                <p><strong>Ім'я:</strong> {director.name}</p>
                <p>{director.bio}</p>
            </div>
        </section>
    );
}

export default DirectorSchool;
