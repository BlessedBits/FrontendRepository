import React, { useState, useEffect, useRef } from 'react';

function GallerySchool({ schoolId }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        async function fetchPhotos() {
            try {
                const response = await fetch(`/api/schools/${schoolId}/gallery`);
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPhotos();
    }, [schoolId]);

    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 300; // Відстань прокрутки
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (loading) {
        return <p>Завантаження...</p>;
    }
    if (error) {
        return (
            <section id="gallery" className="gallery-component">
                <h2>Наша школа</h2>
                <div className="gallery-container">
                    <button className="scroll-button left" onClick={() => scrollSlider('left')}>❮</button>
                    <div ref={sliderRef} className="gallery-slider">
                        <img src="/school_test/foto1.webp" alt="school" className="gallery-photo" />
                        <img src="/school_test/foto2.jpg" alt="school" className="gallery-photo" />
                        <img src="/school_test/foto3.jpg" alt="school" className="gallery-photo" />
                        <img src="/school_test/foto4.jpeg" alt="school" className="gallery-photo" />
                    </div>
                    <button className="scroll-button right" onClick={() => scrollSlider('right')}>❯</button>
                </div>            
            </section>
        );
    }

    return (
        <section id="gallery" className="gallery-component">
            <h2>Наша школа</h2>
            <div className="gallery-container">
                <button className="scroll-button left" onClick={() => scrollSlider('left')}>❮</button>
                <div ref={sliderRef} className="gallery-slider">
                    {photos.length > 0 ? (
                        photos.map(photo => (
                            <img key={photo.id} src={photo.url} alt={`Фото ${photo.id}`} className="gallery-photo" />
                        ))
                    ) : (
                        <p>Немає доступних фото.</p>
                    )}
                </div>
                <button className="scroll-button right" onClick={() => scrollSlider('right')}>❯</button>
            </div>
        </section>
    );
}

export default GallerySchool;
