import React, { useState } from "react";
import "./Modal.css"; 

const HomeWorkModal = ({ closeModal }) => {
  const [link, setLink] = useState("");
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      link,
      photo,
      file,
      text,
    });
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Додати інформацію</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="link">Посилання:</label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Фото:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Файл:</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Текст:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Зберегти</button>
            <button type="button" onClick={closeModal}>
              Відмінити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeWorkModal;
