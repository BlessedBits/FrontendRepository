import React from 'react';

function ContactSchool() {
    return (
        <section id="contacts" className="contact-component">
            <h2>Контакти</h2>
            <form className="contact-form">
                <label htmlFor="phone">Телефон:</label>
                <input type="text" id="phone" value="+380xxxxxxxxx" readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value="test@gmail.com" readOnly />
            </form>

            <div className="social-media">
                <h3>Ми в соц мережах:</h3>
                <ul className="social-icons">
                    <li><img src="facebook0.png" alt="Facebook" className="icon" /> Facebook</li>
                    <li><img src="you-tube0.png" alt="YouTube" className="icon" /> YouTube</li>
                    <li><img src="instagram-circle0.png" alt="Instagram" className="icon" /> Instagram</li>
                </ul>
            </div>
        </section>
    );
}

export default ContactSchool;