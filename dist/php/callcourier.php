<?php
  include('./_functions.php');
  
  addToDB("courier", $_POST);  
  
  $sbj = 'Заказ Курьера';
  $msg = '
    Отправитель: '.$_POST['name_otp'].'<br>
    Получатель: '.$_POST['name_pol'].'<br>
    Адрес отправления: '.$_POST['city_otp'].'<br>
    Адрес получения: '.$_POST['city_pol'].'<br>
    Приблизительный вес: '.$_POST['weight'].'<br>
    Контактный телефон: '.$_POST['phone'].'<br>
    '.$_POST['cashpay'].' '.$_POST['summ'];

  sendMail($sbj, $msg);

?>