Дані завантажуються з API /api/users/${user_id}/courses. Формат відповіді очікується як:

json
  const testCourses = [
    {
      id: 1,
      name: "Біологія 4 клас",
      themes: [
        {
          id: 101,
          name: "Тема 1: Клітини",
          description: "Опис теми про клітини.",
          homework: "Прочитати параграф 3, зробити завдання №2.",
          links: ["https://example.com/cells"],
        },
        {
          id: 102,
          name: "Тема 2: Органи",
          description: "Опис теми про органи.",
          homework: "Скласти таблицю органів людини.",
          links: ["https://example.com/organs"],
        },
      ],
    },
  ]


const response = await fetch(`/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });




      const response = await fetch(`/api/courses/${courseId}/themes/${theme.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTheme),
      });






      const response = await fetch(`/api/courses/${courseId}`, { method: "DELETE" });