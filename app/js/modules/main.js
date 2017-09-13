(() => {

//= calculator.js
//= initform.js
//= bottom.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('isCashPay').onchange = event => {
        const elemToShow = document.getElementById('cashPaySumm');
        elemToShow.style.display = event.target.checked ? 'block' : 'none';
        elemToShow.children[0].focus();
    }
});

})()



