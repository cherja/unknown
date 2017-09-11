function initForm(className, phpScriptName) {
    document.querySelectorAll(className).forEach(form => {

        form.addEventListener('submit', e => {
            e.preventDefault();
    
            var phone = form.querySelector('.tell').value;
            if (phone.length < 10) return alert('Убедитесь в правильности введенного номера телефона!');
        
            $.ajax({
                type: 'POST',
                url: `../php/${phpScriptName}.php`,
                data: $(form).serialize(),
                success: function() {
                    alert('Спасибо за обращение, ожидайте звонка оператора!');
                },
                error: function() {
                    alert('Непредвиденная ошибка сервера, обратитесь позже...');
                }
            });
        }, false);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initForm('callback_form', 'callback');
    initForm('callcouire_form', 'callcourier');
});