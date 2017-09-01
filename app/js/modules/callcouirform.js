var formcc = document.querySelectorAll('.callcouire_form')

formcc.forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault()

        var phone = form.querySelector('.tell').value
        if (phone.length < 10) return alert('Убедитесь в правильности введенного номера телефона!')
    
        $.ajax({
            type: 'POST',
            url: '../php/callcourier.php',
            data: $(form).serialize(),
            success: function() {
                alert('Спасибо за обращение, ожидайте звонка оператора!')
            },
            error: function() {
                alert('Непредвиденная ошибка сервера, обратитесь позже...')
            }
        });
    })
})
