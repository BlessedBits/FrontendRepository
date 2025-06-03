import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styles from "./ClassChat.module.css";

const socket = io("http://localhost:3003");

const ClassChat = ({ baseInfo }) => {
    const classId = baseInfo.userClassId;
    const userName = `${baseInfo.firstName} ${baseInfo.lastName}`;

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);

    const chatRef = useRef(null);

    // Прокрутка до низу
    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        socket.emit("join-class", { classId, userName });

        socket.on("chat-message", (data) => {
            console.log("Received chat-message:", data);
            if (data.id) {
                setMessages((prev) => {
                    if (!prev.some((msg) => msg.id === data.id)) {
                        const updated = [...prev, data];
                        setTimeout(scrollToBottom, 0);
                        return updated;
                    }
                    return prev;
                });
            } else {
                console.warn("Received message without id:", data);
            }
        });

        socket.on("online-users", (users) => {
            console.log("Received online-users:", users);
            setOnlineUsers(users);
        });

        socket.on("message-deleted", ({ messageId }) => {
            console.log("Received message-deleted:", messageId);
            setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
        });

        socket.on("message-edited", ({ messageId, text }) => {
            console.log("Received message-edited:", { messageId, text });
            setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, text } : msg)));
        });

        return () => {
            socket.off("chat-message");
            socket.off("online-users");
            socket.off("message-deleted");
            socket.off("message-edited");
        };
    }, [classId, userName]);

    const sendMessage = () => {
        if (input.trim() !== "") {
            if (editingMessageId) {
                // Редагування повідомлення
                socket.emit("edit-message", {
                    messageId: editingMessageId,
                    classId,
                    userName,
                    newText: input,
                });
                setEditingMessageId(null);
            } else {
                // Надсилання нового повідомлення
                socket.emit("send-message", {
                    text: input,
                    classId,
                    userName,
                });
            }
            setInput("");
            setTimeout(scrollToBottom, 100);
        }
    };

    const deleteMessage = (messageId) => {
        socket.emit("delete-message", { messageId, classId, userName });
    };

    const editMessage = (messageId, text) => {
        setEditingMessageId(messageId);
        setInput(text);
        setTimeout(() => {
            const inputElement = document.querySelector(`.${styles.input}`);
            if (inputElement) inputElement.focus();
        }, 0);
    };

    const cancelEdit = () => {
        setEditingMessageId(null);
        setInput("");
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Чат класу {classId}</h2>
            <div className={styles.onlineUsers}>
                <span className={styles.onlineUsersLabel}>Онлайн ({onlineUsers.length}): </span>
                {onlineUsers.join(", ")}
            </div>
            <div className={styles.chatArea} ref={chatRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={styles.message}>
                        <span className={styles.messageSender}>{msg.user}:</span>
                        <span className={styles.messageText}>{msg.text}</span>
                        <span className={styles.messageTimestamp}>
                            ({new Date(msg.timestamp).toLocaleTimeString()})
                        </span>
                        {msg.user === userName && (
                            <div className={styles.messageActions}>
                                <button
                                    onClick={() => editMessage(msg.id, msg.text)}
                                    className={styles.editButton}
                                    title="Редагувати повідомлення"
                                >
                                    ✎
                                </button>
                                <button
                                    onClick={() => deleteMessage(msg.id)}
                                    className={styles.deleteButton}
                                    title="Видалити повідомлення"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder={editingMessageId ? "Редагувати повідомлення..." : "Введіть повідомлення..."}
                    className={`${styles.input} ${editingMessageId ? styles.editingInput : ""}`}
                />
                {editingMessageId ? (
                    <>
                        <button onClick={sendMessage} className={styles.button}>
                            Зберегти
                        </button>
                        <button onClick={cancelEdit} className={styles.cancelButton}>
                            Скасувати
                        </button>
                    </>
                ) : (
                    <button onClick={sendMessage} className={styles.button}>
                        Надіслати
                    </button>
                )}
            </div>
        </div>
    );
};

export default ClassChat;
