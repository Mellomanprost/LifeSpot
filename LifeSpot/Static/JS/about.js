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

/* Запишем отзыв на страницу */
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

function Slider(sldrId) {

    let id = document.getElementById(sldrId);
    if (id) {
        this.sldrRoot = id;
    }
    else {
        this.sldrRoot = document.querySelector('.slider');
    };

    // Slider objects
    this.sldrList = this.sldrRoot.querySelector('.slider-list');
    this.sldrElements = this.sldrList.querySelectorAll('.slider-element');
    this.sldrElemFirst = this.sldrList.querySelector('.slider-element');
    this.leftArrow = this.sldrRoot.querySelector('div.slider-arrow-left');
    this.rightArrow = this.sldrRoot.querySelector('div.slider-arrow-right');
    this.indicatorDots = this.sldrRoot.querySelector('div.slider-dots');

    // Initialization
    this.options = Slider.defaults;
    Slider.initialize(this);
};

Slider.defaults = {

    // Default options for the slider
    loop: false,     // Бесконечное зацикливание слайдера
    auto: false,     // Автоматическое пролистывание
    interval: 5000, // Интервал между пролистыванием элементов (мс)
    arrows: true,   // Пролистывание стрелками
    dots: true      // Индикаторные точки
};

Slider.prototype.elemPrev = function (num) {
    num = num || 1;

    let prevElement = this.currentElement;
    this.currentElement -= num;
    if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

    if (!this.options.loop) {
        if (this.currentElement == 0) {
            this.leftArrow.style.display = 'none';
        };
        this.rightArrow.style.display = 'block';
    };

    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';

    if (this.options.dots) {
        this.dotOn(prevElement);
        this.dotOff(this.currentElement);
    }
};

Slider.prototype.elemNext = function (num) {
    num = num || 1;

    let prevElement = this.currentElement;
    this.currentElement += num;
    if (this.currentElement >= this.elemCount) this.currentElement = 0;

    if (!this.options.loop) {
        if (this.currentElement == this.elemCount - 1) {
            this.rightArrow.style.display = 'none';
        };
        this.leftArrow.style.display = 'block';
    };

    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';

    if (this.options.dots) {
        this.dotOn(prevElement);
        this.dotOff(this.currentElement);
    }
};

Slider.prototype.dotOn = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;';
};

Slider.prototype.dotOff = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;';
};

Slider.initialize = function (that) {

    // Constants
    that.elemCount = that.sldrElements.length; // Количество элементов

    // Variables
    that.currentElement = 0;
    let bgTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    };
    function setAutoScroll() {
        that.autoScroll = setInterval(function () {
            let fnTime = getTime();
            if (fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime;
                that.elemNext();
            }
        },
            that.options.interval);
    };

    // Start initialization
    if (that.elemCount <= 1) {   // Отключить навигацию
        that.options.auto = false;
        that.options.arrows = false; that.options.dots = false;
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none';
    };
    if (that.elemCount >= 1) {   // показать первый элемент
        that.sldrElemFirst.style.opacity = '1';
    };

    if (!that.options.loop) {
        that.leftArrow.style.display = 'none';  // отключить левую стрелку
        that.options.auto = false; // отключить автопркрутку
    }
    else if (that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.sldrList.addEventListener('mouseenter', function () {
            clearInterval(that.autoScroll);
        }, false);
        that.sldrList.addEventListener('mouseleave', setAutoScroll, false);
    };

    if (that.options.arrows) {  // инициализация стрелок
        that.leftArrow.addEventListener('click', function () {
            let fnTime = getTime();
            if (fnTime - bgTime > 1000) {
                bgTime = fnTime;
                that.elemPrev();
            }
        }, false);
        that.rightArrow.addEventListener('click',
            function () {
                let fnTime = getTime();
                if (fnTime - bgTime > 1000) {
                    bgTime = fnTime;
                    that.elemNext();
                }
            },
            false);
    }
    else {
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none';
    };

    if (that.options.dots) {  // инициализация индикаторных точек
        let sum = '', diffNum;
        for (let i = 0; i < that.elemCount; i++) {
            sum += '<span class="dot"></span>';
        };
        that.indicatorDots.innerHTML = sum;
        that.indicatorDotsAll =
            that.sldrRoot.querySelectorAll('span.dot');
        // Назначаем точкам обработчик события 'click'
        for (let n = 0; n < that.elemCount; n++) {
            that.indicatorDotsAll[n].addEventListener('click',
                function () {
                    diffNum = Math.abs(n - that.currentElement);
                    if (n < that.currentElement) {
                        bgTime = getTime();
                        that.elemPrev(diffNum);
                    } else if (n > that.currentElement) {
                        bgTime = getTime();
                        that.elemNext(diffNum);
                    }
                    // Если n == that.currentElement ничего не делаем
                },
                false);
        };
        that.dotOff(0);  // точка[0] выключена, остальные включены
        for (let i = 1; i < that.elemCount; i++) {
            that.dotOn(i);
        }
    }
};
