<?php

  //  Запись в БД
  $sql = 'INSERT INTO courier SET data=now()';
  foreach($_POST as $k => $v) {
    $sql .= ', '.$k.'='.$v;
  }
  include('./db.php');

  //  Отправка e-mail
  $subject = 'Заказ Курьера';
  $message = '
    Отправитель: '.$_POST['name_otp'].'\r\n
    Получатель: '.$_POST['name_pol'].'\r\n
    Адрес отправления: '.$_POST['city_otp'].'\r\n
    Адрес получения: '.$_POST['city_pol'].'\r\n
    Приблизительный вес: '.$_POST['weight'].'\r\n
    Контактный телефон: '.$_POST['phone'].'\r\n
    '.$_POST['cashpay'].'
  ';
  include('./mail.php');  

?>