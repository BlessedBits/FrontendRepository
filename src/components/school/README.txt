#Коли будете робити Api, гляньте на ці компоненти на url та дані, які треба для сторінок!!!!!!

#Для contact.js посилання `/api/schools/${schoolId}/contact`
Треба:
    schoolData.phone_number
    schoolData.email
    schoolData.youtube_link
    schoolData.facebook_link
    schoolData.intagram_link
    schoolData.tiktok_link

#Для Gallery.js /api/schools/${schoolId}/gallery
Треба:
    photos //Треба буде це протестить як працює


#Для Info.js `/api/schools/${schoolId}/school_details`
Треба:
    schoolInfo.years
    schoolInfo.address
    schoolInfo.student_count
    schoolInfo.teacher_count


#Для Director.js `/api/schools/${schoolId}/director`
Треба:
    director.photo_url
    director.name
    director.bio


#Для Achievements.js `/api/schools/${schoolId}/events/important
Треба:
    achievement.image_url
    achievement.title
    achievement.description

    
#Також поки стоять заглушки, які замість виводу помилок, вивоять статичну інформацію
