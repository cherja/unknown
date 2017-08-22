<?php

  $name  = $_POST['name'];
  $phone = $_POST['phone'];

  //  Запись в БД
  $host     = 'kurer.mysql.ukraine.com.ua';
  $user     = 'kurer_db';
  $pass     = 'ya7YACjW';
  $database = 'kurer_db';

  $sql = 'INSERT INTO reg SET data=now(), name=$name, phone=$phone';

  $mysqli = new mysqli($host, $user, $pass, $database);
  $mysqli->set_charset('utf8');
  $mysqli->query($sql);
  $mysqli->close();

  //  Отправка e-mail
  $to      = 'kurer.online@yandex.ru';
  $subject = 'Заказ звонка';
  $message = $name.' '.$phone;

  $headers  = 'Content-type: text/html; charset=utf-8 \r\n';
  $headers .= 'From: CallBack <call-back@aist-post.com>\r\n';

  mail($to, $subject, $message, $headers);

?>