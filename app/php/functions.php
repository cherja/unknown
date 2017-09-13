<?php

  function addToDB($table, $fields) {

    $host     = 'kurer.mysql.ukraine.com.ua';
    $user     = 'kurer_db';
    $pass     = 'ya7YACjW';
    $database = 'kurer_db';

    $sql = "INSERT INTO $table SET";
    $counter = 0;
    
    foreach($fields as $k => $v) {
      $counter++;

      $sql .= " $k='$v'";

      //Если не последний элемент, то добавим запятую
      if ($counter != count($fields)) $sql .= ',';
    }

    $mysqli = new mysqli($host, $user, $pass, $database);
    $mysqli->set_charset('utf8');
    $mysqli->query($sql);
    $mysqli->close();

  }

  function sendMail($sbj, $msg) {

    $to      = 'kurer.online@gmail.com';
    $headers  = 'Content-type: text/html; charset=utf-8 \r\n';
    $headers .= 'From: CallBack <call-back@aist-post.com>\r\n';


    $emeail_to = "kurer.online@gmail.com";
    $headers   = "Content-type: text/html; charset=utf-8 \r\n";
    $headers  .= "From: <kurer.online@kurer.online>\r\n";
  
    mail($emeail_to, $sbj, $msg, $headers);

  }

  function uploadFiles($filesList) {

    $pathForLinks = "http://www.east-exp.com/php/files";
    $linksList = [];

    foreach ($filesList["error"] as $key => $error) {
        if ($error == "0") {
            $tmp_name = $filesList["tmp_name"][$key];
            $name = str_replace(' ', '_', $filesList["name"][$key]);
            $name = basename($name);
            $linksList[$key] = "$pathForLinks/$name";
            
            move_uploaded_file($tmp_name, "./files/$name");
        }
    }   

    return $linksList;

  }
  

?>