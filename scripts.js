// слайдер главный
$(() => {
    const swiper1 = new Swiper(".swiper1", {
        pagination: {
            el: ".swiper-pagination",
        },
    });
});

// слайдер товаро в мобиле
$(() => {
    const swipe2 = new Swiper(".swiper2", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
});

// карта
$(() => {
    ymaps.ready(function () {

        const isMobile1 = window.matchMedia('(max-width: 991px)').matches;
        let myMap;

        if (isMobile1) {
            myMap = new ymaps.Map('mobile-map', {
                center: [59.129590, 37.890606],
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search',
            });
        } else {
            myMap = new ymaps.Map('map', {
                center: [59.129590, 37.890606],
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search',
            });
        }


        const myPlacemark = new ymaps.Placemark([59.129590, 37.890606], {}, {});

        myMap.geoObjects.add(myPlacemark);

        myMap.behaviors.disable('scrollZoom');

        myMap.addClass('noZoom');
        myMap.events.add('click', () => {
            if (map.hasClass('noZoom')) {
                myMap.removeClass('noZoom').addClass('yesZoom');
                myMap.behaviors.enable('scrollZoom');
            } else {
                myMap.removeClass('yesZoom').addClass('noZoom');
                myMap.behaviors.disable('scrollZoom');
            }
        });

        const isMobile = {
            Android: () => (navigator.userAgent.match(/Android/i)),
            BlackBerry: () => (navigator.userAgent.match(/BlackBerry/i)),
            iOS: () => (navigator.userAgent.match(/iPhone|iPad|iPod/i)),
            Opera: () => (navigator.userAgent.match(/Opera Mini/i)),
            Windows: () => (navigator.userAgent.match(/IEMobile/i)),
            any: () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
        };

        if (isMobile.any()) {
            myMap.behaviors.disable('drag');
        }
    });
});

// функционал счётчика товаров
$(() => {
    $('.card__input input').on('focusin', function () {
        $(this).parents('.card__input').addClass('focus');
    });

    $('.card__input input').on('focusout', function () {
        $(this).parents('.card__input').removeClass('focus');
    });

    // increment/decrement qlt
    $('.card__input .plus').on('click', function () {
        const value = +$(this).parents('.card__input').find('input').val();
        const newValue = value + 1;

        $(this).parents('.card__input').find('input').val(newValue);
    });

    $('.card__input .minus').on('click', function () {
        const value = +$(this).parents('.card__input').find('input').val();
        let newValue = value - 1;

        if (newValue <= 0) {
            newValue = 1;
        }

        $(this).parents('.card__input').find('input').val(newValue);
    });
});

// функционал избранного
$(() => {
    // опреляем есть ли у нас избранное, если есть то записываем в переменную
    let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

    // if (localStorage.getItem('favorites') !== null) {
    //     favorites = localStorage.getItem('favorites');
    // }

    // расставляем классы для сохраненных избранных товаров
    favorites.forEach((value) => {
        $(`.card[data-id=${value}] .like`).addClass('liked');
        // console.log(`.card[data-id=${value}] .like`);
    });

    // обработываем клик по иконке(кнопке)
    $('.like').on('click', function () {
        const productID = $(this).parents('.card').data('id');

        // удаляем из избранного
        if (favorites.includes(productID)) {
            favorites = favorites.filter((value) => value !== productID);
            $(this).removeClass('liked');

            // favorites = favorites.filter(function(value) {
            //     return value !== productID;
            // });

        } else { // добавляем в избранное
            favorites = [...favorites, productID];

            $(this).addClass('liked');
        }

        // заносим в локал сторадж
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(favorites);
    });
});

// добавление в корзину
$(() => {
    let cart = [];

    $('.card__order').on('click', function () {
    
        const productID = $(this).parents('.card').data('id');
        const count = +$(this).parents('.card').find('input[type=number]').val();
    
        cart = [...cart, {
            id: productID,
            count: count
        }];
    
        console.log(cart);
    });
});

