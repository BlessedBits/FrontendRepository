import React from 'react';

function InfoSchool() {
    return (
        <section id="school-info" className="info-component">
            <h2>Наша районна гімназія</h2>
            <p>Горить і не згасає</p>

            <table className="info-table">
                <tr>
                    <th>Рік заснування:</th>
                    <td>2023</td>
                </tr>
                <tr>
                    <th>Розташування:</th>
                    <td>м. Львів, вул. Романа Олега 42</td>
                </tr>
                <tr>
                    <th>Кількість учнів:</th>
                    <td>5</td>
                </tr>
                <tr>
                    <th>Кількість вчителів:</th>
                    <td>1</td>
                </tr>
            </table>
        </section>
    );
}

export default InfoSchool;
