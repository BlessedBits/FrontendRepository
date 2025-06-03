import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClassChat from "../ClassChat";
import io from "socket.io-client";
import SocketMock from "socket.io-mock";

jest.mock("socket.io-client", () => {
    return jest.fn(() => new SocketMock());
});

describe("ClassChat", () => {
    let socket;
    const baseInfo = {
        userClassId: "152",
        firstName: "Барак",
        lastName: "Обама",
    };

    beforeEach(() => {
        socket = io();
        jest.clearAllMocks();
        Object.defineProperty(HTMLElement.prototype, "scrollTop", {
            configurable: true,
            set: jest.fn(),
            get: jest.fn(() => 100),
        });
        Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
            configurable: true,
            get: jest.fn(() => 200),
        });
    });

    afterEach(() => {
        socket.socketClient.clear();
    });

    test("рендерить компонент із правильним заголовком і списком онлайн-користувачів", () => {
        render(<ClassChat baseInfo={baseInfo} />);
        expect(screen.getByText("Чат класу 152")).toBeInTheDocument();
        expect(screen.getByText("Онлайн (0):")).toBeInTheDocument();

        // Симулюємо подію online-users
        socket.socketClient.emit("online-users", ["Барак Обама", "Киця Бабина"]);
        expect(screen.getByText("Онлайн (2): Барак Обама, Киця Бабина")).toBeInTheDocument();
    });

    test("відображає отримані повідомлення", async () => {
        render(<ClassChat baseInfo={baseInfo} />);
        const message = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        socket.socketClient.emit("chat-message", message);

        await waitFor(() => {
            expect(screen.getByText("Барак Обама: Привіт!")).toBeInTheDocument();
            expect(screen.getByText(`(${new Date(message.timestamp).toLocaleTimeString()})`)).toBeInTheDocument();
        });
    });

    test("надсилає нове повідомлення при натисканні кнопки Надіслати", async () => {
        const user = userEvent.setup();
        render(<ClassChat baseInfo={baseInfo} />);
        const input = screen.getByPlaceholderText("Введіть повідомлення...");
        const sendButton = screen.getByText("Надіслати");

        await user.type(input, "Привіт, клас!");
        await user.click(sendButton);

        expect(socket.emit).toHaveBeenCalledWith("send-message", {
            text: "Привіт, клас!",
            classId: "152",
            userName: "Барак Обама",
        });
        expect(input).toHaveValue("");
    });

    test("надсилає нове повідомлення при натисканні Enter", async () => {
        const user = userEvent.setup();
        render(<ClassChat baseInfo={baseInfo} />);
        const input = screen.getByPlaceholderText("Введіть повідомлення...");

        await user.type(input, "Привіт, клас!");
        await user.keyboard("{Enter}");

        expect(socket.emit).toHaveBeenCalledWith("send-message", {
            text: "Привіт, клас!",
            classId: "152",
            userName: "Барак Обама",
        });
        expect(input).toHaveValue("");
    });

    test("показує кнопки редагування та видалення лише для власних повідомлень", async () => {
        render(<ClassChat baseInfo={baseInfo} />);
        const ownMessage = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        const otherMessage = {
            id: "2",
            user: "Киця Бабина",
            text: "Мяу!",
            timestamp: new Date().toISOString(),
        };

        socket.socketClient.emit("chat-message", ownMessage);
        socket.socketClient.emit("chat-message", otherMessage);

        await waitFor(() => {
            const ownMessageElement = screen.getByText("Барак Обама: Привіт!");
            const editButton = ownMessageElement.parentElement?.querySelector(
                'button[title="Редагувати повідомлення"]'
            );
            const deleteButton = ownMessageElement.parentElement?.querySelector(
                'button[title="Видалити повідомлення"]'
            );
            expect(editButton).toBeInTheDocument();
            expect(deleteButton).toBeInTheDocument();

            const otherMessageElement = screen.getByText("Киця Бабина: Мяу!");
            expect(otherMessageElement.parentElement?.querySelector("button")).not.toBeInTheDocument();
        });
    });

    test("редагує повідомлення при натисканні Зберегти", async () => {
        const user = userEvent.setup();
        render(<ClassChat baseInfo={baseInfo} />);
        const message = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        socket.socketClient.emit("chat-message", message);

        await waitFor(() => screen.getByText("Барак Обама: Привіт!"));

        const editButton = screen.getByTitle("Редагувати повідомлення");
        await user.click(editButton);

        const input = screen.getByPlaceholderText("Редагувати повідомлення...");
        expect(input).toHaveValue("Привіт!");

        await user.clear(input);
        await user.type(input, "Привіт, клас!");
        await user.click(screen.getByText("Зберегти"));

        expect(socket.emit).toHaveBeenCalledWith("edit-message", {
            messageId: "1",
            classId: "152",
            userName: "Барак Обама",
            newText: "Привіт, клас!",
        });
        expect(input).toHaveValue("");
        expect(screen.getByText("Зберегти")).not.toBeInTheDocument();
    });

    test("скасовує редагування при натисканні Скасувати", async () => {
        const user = userEvent.setup();
        render(<ClassChat baseInfo={baseInfo} />);
        const message = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        socket.socketClient.emit("chat-message", message);

        await waitFor(() => screen.getByText("Барак Обама: Привіт!"));

        const editButton = screen.getByTitle("Редагувати повідомлення");
        await user.click(editButton);

        const input = screen.getByPlaceholderText("Редагувати повідомлення...");
        expect(input).toHaveValue("Привіт!");

        await user.click(screen.getByText("Скасувати"));

        expect(input).toHaveValue("");
        expect(screen.getByPlaceholderText("Введіть повідомлення...")).toBeInTheDocument();
        expect(screen.getByText("Скасувати")).not.toBeInTheDocument();
    });

    test("видаляє повідомлення при натисканні кнопки видалення", async () => {
        const user = userEvent.setup();
        render(<ClassChat baseInfo={baseInfo} />);
        const message = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        socket.socketClient.emit("chat-message", message);

        await waitFor(() => screen.getByText("Барак Обама: Привіт!"));

        const deleteButton = screen.getByTitle("Видалити повідомлення");
        await user.click(deleteButton);

        expect(socket.emit).toHaveBeenCalledWith("delete-message", {
            messageId: "1",
            classId: "152",
            userName: "Барак Обама",
        });
    });

    test("оновлює повідомлення при отриманні message-edited", async () => {
        render(<ClassChat baseInfo={baseInfo} />);
        const message = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        socket.socketClient.emit("chat-message", message);

        await waitFor(() => screen.getByText("Барак Обама: Привіт!"));

        socket.socketClient.emit("message-edited", { messageId: "1", text: "Привіт, клас!" });

        await waitFor(() => {
            expect(screen.getByText("Барак Обама: Привіт, клас!")).toBeInTheDocument();
            expect(screen.queryByText("Барак Обама: Привіт!")).not.toBeInTheDocument();
        });
    });

    test("видаляє повідомлення при отриманні message-deleted", async () => {
        render(<ClassChat baseInfo={baseInfo} />);
        const message = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        socket.socketClient.emit("chat-message", message);

        await waitFor(() => screen.getByText("Барак Обама: Привіт!"));

        socket.socketClient.emit("message-deleted", { messageId: "1" });

        await waitFor(() => {
            expect(screen.queryByText("Барак Обама: Привіт!")).not.toBeInTheDocument();
        });
    });

    test("виконує автоматичну прокрутку при новому повідомленні", async () => {
        render(<ClassChat baseInfo={baseInfo} />);
        const message = {
            id: "1",
            user: "Барак Обама",
            text: "Привіт!",
            timestamp: new Date().toISOString(),
        };
        socket.socketClient.emit("chat-message", message);

        await waitFor(() => {
            expect(HTMLElement.prototype.scrollTop).toHaveBeenCalled();
        });
    });
});
