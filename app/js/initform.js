function initForm(className, phpScriptName) {
    document.querySelectorAll('.' + className).forEach(form => {

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
                    successForm(form);
                },
                error: function() {
                    alert('Непредвиденная ошибка сервера, обратитесь позже...');
                }
            });
        }, false);
    });
}

function successForm(form) {
    form.querySelectorAll('input:not([type="submit"])').forEach(input => input.value = "");
    const parent = form.parentNode;
    if (parent.classList.contains('remodal')) {
        const inst = $(parent).remodal();
        inst.close();
    }
}

        
    initForm('callback_form', 'callback');
    initForm('callcouire_form', 'callcourier');

