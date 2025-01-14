import React, { useState, useEffect, useRef } from 'react';
import styles from './GallerySchool.module.css';

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
            const scrollAmount = 320; // Відстань прокрутки
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
            <section id="gallery" className={styles.galleryComponent}>
                <h2 className={styles.galleryTitle}>Наша школа</h2>
                <div className={styles.galleryContainer}>
                    <button className={`${styles.scrollButton} ${styles.scrollButtonLeft}`} onClick={() => scrollSlider('left')}>❮</button>
                    <div ref={sliderRef} className={styles.gallerySlider}>
                        <img src="/school_test/foto1.webp" alt="school" className={styles.galleryPhoto} />
                        <img src="/school_test/foto2.jpg" alt="school" className={styles.galleryPhoto} />
                        <img src="/school_test/foto3.jpg" alt="school" className={styles.galleryPhoto} />
                        <img src="/school_test/foto4.jpeg" alt="school" className={styles.galleryPhoto} />
                    </div>
                    <button className={`${styles.scrollButton} ${styles.scrollButtonRight}`} onClick={() => scrollSlider('right')}>❯</button>
                </div>            
            </section>
        );
    }

    return (
        <section id="gallery" className={styles.galleryComponent}>
            <h2 className={styles.galleryTitle}>Наша школа</h2>
            <div className={styles.galleryContainer}>
                <button className={`${styles.scrollButton} ${styles.scrollButtonLeft}`} onClick={() => scrollSlider('left')}>❮</button>
                <div ref={sliderRef} className={styles.gallerySlider}>
                    {photos.length > 0 ? (
                        photos.map(photo => (
                            <img key={photo.id} src={photo.url} alt={`Фото ${photo.id}`} className={styles.galleryPhoto} />
                        ))
                    ) : (
                        <p>Немає доступних фото.</p>
                    )}
                </div>
                <button className={`${styles.scrollButton} ${styles.scrollButtonRight}`} onClick={() => scrollSlider('right')}>❯</button>
            </div>
        </section>
    );
}

export default GallerySchool;
