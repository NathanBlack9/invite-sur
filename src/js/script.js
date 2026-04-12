function smoothPower(distance, duration) {
  const startY = window.pageYOffset;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = elapsed / duration;

    if (progress < 1) {
      // Используем scrollTo, но браузер всё равно может округлять.
      // Чтобы было мягче, используем чуть более сложную формулу прогресса
      const ease = progress; // линейно
      window.scrollTo(0, startY + distance * ease);
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, startY + distance);
    }
  }
  requestAnimationFrame(step);
}

$(() => {
  // playMusic();

  setTimeout(() => {
    $('.js-first-animation').addClass('inview');
  }, 500);

  // Прокрутить на 100px за 3 секунды и через 3 секунды
  // if(window.scrollY == 0) {
  //   setTimeout(() => {
  //     smoothPower(200, 3000);
  //   }, 5000);
  // }

  // const playMusic = () => {
  //   // Создаем элемент audio динамически
  //   const audio = new Audio('/img/music.mp3');
  //   audio.volume = 0.1;
  //   audio.play();
  // }
})

$(() => {
  $('.js-inview').each(function inviewHandler() {
    $(this).bind('inview', (event, isInView, visiblePartX, visiblePartY) => {
    // $(this).bind('inview', (event, isInView) => {
      console.log(visiblePartY, 'visiblePartY')
      if (
        ($(this).hasClass('js-inview-top') && isInView)
        || (!$(window).width() > 480 ? visiblePartY === 'center' || visiblePartY === 'bottom' : isInView)
        // isInView
      ) {
        $(this).addClass('inview').unbind('inview');
        $(this).trigger('inviewTriggered');
      }
      $(window).trigger('inviewTriggered');
    });
  });

  $('#calendar').datepicker({
    defaultDate: new Date(2026, 5, 2),
    beforeShowDay: function(date) {
        var month = date.getMonth();
        var day = date.getDate();

        // Просто блокируем 30 и 31 число в феврале
        if (month === 1 && day > 29) {
            return [false, ''];
        }
        return [true, ''];
    }
  })
});

document.addEventListener('DOMContentLoaded', () => {
  // Установите конечную дату
  const deadline = new Date('2026-06-01T23:59:59');

  // Найдите элементы DOM
  const elDays = document.querySelector('.timer__days');
  const elHours = document.querySelector('.timer__hours');
  const elMinutes = document.querySelector('.timer__minutes');
  const elSeconds = document.querySelector('.timer__seconds');

  // Функция склонения числительных
  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
  };

  // Функция обновления таймера
  const updateTimer = () => {
    const now = new Date();
    const diff = Math.max(0, deadline - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    elDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    elSeconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

    if (diff === 0) {
      clearInterval(timerId);
    }
  };

  // Запустите таймер
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});