import React from "react";

const Features = () => {
    return (
        <section id = "faq"className="faq">
            <div className="questions">
                <h2>Відповіді на деякі питання:</h2>
                <ul>
                    <li><a href="#">Як створити клас?</a></li>
                    <li><a href="#">Як додати вчителів/учнів у школу?</a></li>
                    <li><a href="#">Як користуватися щоденником?</a></li>
                </ul>
                <a href="#" className="ask-question-btn">Задати своє питання</a>
            </div>
            <div className="image">
                <img src="https://via.placeholder.com/150" alt="Character image"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper felis sed elit
                    condimentum,
                    quis suscipit mauris convallis.</p>
            </div>
        </section>
    );
};

export default Features;
