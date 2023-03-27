// Конструктор отзыва
function Comment() {
    this.author = prompt("Как вас зовут ?")
    if (this.author == null) {
        this.empty = true;
        return;
    }

    this.text = prompt("Напишите свой отзыв");
    if (this.text == null) {
        this.empty = true;
        return;
    }

    this.date = new Date().toLocaleString();
}


function addComment() {
    // Создадим объект
    let comment = new Comment();

    // проверяем, успешно ли юзер осуществил ввод
    if (comment.empty) {
        return;
    }

    let enableLikes = confirm("Хотите ли Вы, чтобы комментарий могли оценить другие?");

    if (enableLikes) {
        let review = Object.create(comment);
        review.rate = 0;
        // Добавим на страницу
        writeReview(review);
    } else {
        // Добавим простой комментарий на страницу
        writeReview(comment);
    }
}

/*
* Запишем отзыв на страницу 
* 
* */
const writeReview = review => {
    let likeCounter = '';

    if (review.hasOwnProperty('rate')) {

        // Генерим идентификатор комментария.
        let commentId = Math.random();
        // Для кнопки лайков добавляем: идентификатор, атрибут onclick для передачи идентификатора в функцию, значок лайка, и само значение счётчика отделяем пробелом
        // Также мы добавили стиль, чтобы кнопка смотрелась лучше и не имела рамок
        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">' + `❤️ ${review.rate}</button>`
    }

    // Запишем результат 
    document.getElementsByClassName('reviews')[0].innerHTML += '    <div class="review-text">\n' +
        `<p> <i> <b>${review['author']}</b>  ${review['date']}${likeCounter}</i></p>` +
        `<p>${review['text']}</p>` +
        '</div>';
}

function addLike(id) {
    // Найдём нужный элемент по id
    let element = document.getElementById(id);
    // Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
    let array = element.innerText.split(' ');
    // Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
    // при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
    let resultNum = parseInt(array[array.length - 1], 10);
    // Увеличим счётчик
    resultNum += 1;
    // Сохраним измененное значение обратно в массив
    array[array.length - 1] = `${resultNum}`;
    // Обновим текст элемента
    element.innerText = array.join(' ');
}

function changeImg() {
    //// Найдём нужный элемент по class
    //let img = document.getElementsByClassName();
    //// Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
    //let array = element.innerText.split(' ');
    //// Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
    //// при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
    //let resultNum = parseInt(array[array.length - 1], 10);
    //// Увеличим счётчик
    //resultNum += 1;
    //// Сохраним измененное значение обратно в массив
    //array[array.length - 1] = `${resultNum}`;
    //// Обновим текст элемента
    //element.innerText = array.join(' ');

}