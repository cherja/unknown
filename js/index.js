
//  Инициализация модального окна
var
  modal            = new tingle.modal({ closeMethods: ['overlay', 'button', 'escape'] }),
  modalContentWrap = document.getElementById('modal'),         //  Обертка формы
  triggers         = document.querySelectorAll('.openRegForm') //  Кнопки открытия окна

// Перемещаем форму из DOM в модалку
modal.setContent(modalContentWrap.innerHTML)

// Удаляем копию формы
modalContentWrap.parentNode.removeChild(modalContentWrap)

//  Кнопки открывают окно по клику
triggers.forEach(function(trigger) {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    modal.open()
  })
})
