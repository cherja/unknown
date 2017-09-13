<?php
  include('./functions.php');
  
  addToDB("reg", $_POST);  
    
  $sbj = 'Заказ звонка';
  $msg = $_POST['name']."<br>".$_POST['phone'];

  sendMail($sbj, $msg);

?>