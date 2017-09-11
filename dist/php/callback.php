<?php

  $name  = $_POST['name'];
  $phone = $_POST['phone'];

  //  Запись в БД
  $sql = 'INSERT INTO reg SET data=now(), name=$name, phone=$phone';
  include('./db.php');  

  //  Отправка e-mail
  $subject = 'Заказ звонка';
  $message = $name.' '.$phone;
  include('./mail.php');  

?>