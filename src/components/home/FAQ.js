import React, { useState } from "react";
import styles from "./FAQ.module.css";

const FAQ = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [fileError, setFileError] = useState("");

    const toggleForm = () => setShowForm(!showForm);

    const handleFileChange = (event) => {
        const files = event.target.files;
        let error = "";

        if (files.length > 2) {
            error = "Ви можете завантажити не більше 2 файлів.";
        }

        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.startsWith("image/")) {
                error = "Будь ласка, завантажте тільки зображення.";
                break;
            }
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].size > 2 * 1024 * 1024) { 
                error = "Максимальний розмір файлу - 2 МБ.";
                break;
            }
        }

        setFileError(error); 
        if (error === "") {
            console.log("Файли прийняті");
        }
    };

    const content = {
        createClass: {
            img: "/home-page-test/test_faq.png",
            text: "Щоб створити клас, перейдіть у розділ 'Адміністрування' та виберіть 'Створити новий клас'."
        },
        addUsers: {
            img: "https://via.placeholder.com/150",
            text: "Додати вчителів або учнів можна у розділі 'Користувачі' в меню адміністратора."
        },
        useDiary: {
            img: "https://via.placeholder.com/150",
            text: "Для користування щоденником натисніть на вкладку 'Щоденник' у головному меню."
        },
        default: {
            img: "https://via.placeholder.com/150",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper felis sed elit condimentum, quis suscipit mauris convallis."
        }
    };

    const selectedContent = content[selectedQuestion] || content.default;

    return (
        <section id="faq" className={styles.faq}>
            <div className={styles.questionsAndAnswers}>
                <div className={styles.questions}>
                    <h2>Відповіді на деякі питання:</h2>
                    <ul>
                        <li>
                            <a 
                                href="javascript:void(0);"
                                className={selectedQuestion === "createClass" ? styles.active : ""}
                                onClick={() => setSelectedQuestion("createClass")}>
                                Як створити клас?
                            </a>
                        </li>
                        <li>
                            <a 
                                href="javascript:void(0);"
                                className={selectedQuestion === "addUsers" ? styles.active : ""}
                                onClick={() => setSelectedQuestion("addUsers")}>
                                Як додати вчителів/учнів у школу?
                            </a>
                        </li>
                        <li>
                            <a 
                                href="javascript:void(0);"
                                className={selectedQuestion === "useDiary" ? styles.active : ""}
                                onClick={() => setSelectedQuestion("useDiary")}>
                                Як користуватися щоденником?
                            </a>
                        </li>
                    </ul>
                    <button className={`${styles["askQuestionBtn-hover"]} ${styles.askQuestionBtn25}`} onClick={toggleForm}>
                        Задати своє питання
                    </button>
                </div>
                <div className={styles.answers}>
                    <img src={selectedContent.img} alt="Character image" />
                    <p>{selectedContent.text}</p>
                </div>
            </div>
            {showForm && (
                <div className={`${styles.contactForm} ${showForm ? styles.show : ''}`}>
                    <form
                        action="https://formspree.io/f/yourFormId"
                        method="POST"
                    >
                        <label htmlFor="email">Ваш Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Введіть ваш email"
                            required
                        />

                        <label htmlFor="subject">Тема:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            placeholder="Введіть тему питання"
                            required
                        />

                        <label htmlFor="message">Повідомлення:</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Введіть ваше повідомлення"
                            required
                        ></textarea>

                        <label htmlFor="attachment">Вкладення:</label>
                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />

                        {fileError && <p style={{ color: "red" }}>{fileError}</p>} {/* Виведення помилки */}

                        <button type="submit" disabled={fileError !== ""}>Відправити</button> {/* Заборона відправки, якщо є помилка */}
                    </form>
                </div>
            )}      
        </section>
    );
};

export default FAQ;
