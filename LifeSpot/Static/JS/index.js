/*
* Сессия теперь создается в общей области видимости.
* Будет "захватываться" тремя функциями
* 
* */

//let session = {
//    'startDate': sessionStorage.getItem('startDate'),
//    'userAgent': sessionStorage.getItem('userAgent'),
//    'userAge': sessionStorage.getItem('userAge')
//}


/*
* Сохранение данных сессии сразу при заходе пользователя на страницу
* 
* */
function handleSession(logger, checker) {

    // Проверяем дату захода и проставляем, если новый визит
    if (sessionStorage.getItem('startDate') == null) {
        sessionStorage.setItem('startDate', new Date().toLocaleString());
    }

    // Проверяем userAgent и проставляем, если новый визит
    if (sessionStorage.getItem('userAgent') == null) {
        sessionStorage.setItem('userAgent', window.navigator.userAgent);
    }

    // Проверяем возраст и проставляем, если новый визит
    if (sessionStorage.getItem('userAge') == null) {
        let input = prompt("Пожалуйста, введите ваш возраст?");
        sessionStorage.setItem('userAge', input);

        /* Возраст отсутствовал в sessionStorage. Значит, это первый визит пользователя, и
        при прохождении проверки на возраст он увидит приветствие*/
        checker(true);
    } else {
        /* Пользователь заходит не первый раз, приветствие не показываем. */
        checker(false);
    }

    /* Вызываем переданную в качестве колл-бэка функцию логирования.
       передавать в качестве коллбека не обязательно, можно вызвать и напрямую, но мы добавили для повторения.
   */
    logger();

    //    // Сохраним время начала сессии
    //    session.startDate = new Date().toLocaleString();
    //    // Сохраним UserAgent
    //    session.userAgent = window.navigator.userAgent;
}

/*
* Проверка возраста пользователя
* 
* */
let checker = function (newVisit) {
    //session.age = prompt("Пожалуйста, введите ваш возраст?");

    if (sessionStorage.getItem('userAge') >= 18) {
        if (newVisit) {
            alert("Приветствуем на LifeSpot! " + '\n' + "Текущее время: " + new Date().toLocaleString());
        }
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}


/*
* Вывод данных сессии в консоль
* 
* */
let logger = function () {
    console.log('Начало сессии: ' + sessionStorage.getItem('startDate'));
    console.log('Данные клиента: ' + sessionStorage.getItem('userAgent'));
    console.log('Возраст пользователя: ' + sessionStorage.getItem('userAge'));
}

/*
* Функция для фильтраци контента
* Будет вызываться благодаря атрибуту oninput на index.html
* 
* */

function filterContent() {
    let elements = document.getElementsByClassName('video-container');

    for (let i = 0; i <= elements.length; i++) {
        let videoText = elements[i].getElementsByTagName('h3')[0].innerText;

        if (!videoText.toLowerCase().includes(inputParseFunction().toLowerCase())) {
            elements[i].style.display = 'none';
        } else {
            elements[i].style.display = 'inline-block';
        }
    }
}

/*
* Всплывающее окно будет показано по таймауту
*
* */
// setTimeout(() =>
//     alert("Нравится LifeSpot? " + '\n' +  "Подпишитесь на наш Instagram @lifespot999!" ),
// 7000);




