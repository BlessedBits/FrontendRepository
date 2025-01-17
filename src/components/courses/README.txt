Дані завантажуються з API /api/users/${user_id}/courses. Формат відповіді очікується як:

json
  const testCourses = [
    {
      id: 1,
      name: "Біологія 4 клас",

      id: 2,
      name: "Біологія 5 клас",
    },
]


ТОБТО ВСІ КУРСИ КОРИСТУВАЧА

ДАЛЬШЕ ТРЕБА ТЕМИ ДЛЯ КОЖНОГО КУРСУ

{
  "title": "string",
  "description": "string",
  "url": "string",
}


Завдання

{
  "title": "string",
  "description": "string",
  "url": "string",
  "dueDate": "localDateTime"
}

