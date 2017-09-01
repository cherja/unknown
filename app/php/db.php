<?php 
    $host     = 'kurer.mysql.ukraine.com.ua';
    $user     = 'kurer_db';
    $pass     = 'ya7YACjW';
    $database = 'kurer_db';

    $mysqli = new mysqli($host, $user, $pass, $database);
    $mysqli->set_charset('utf8');
    $mysqli->query($sql);
    $mysqli->close();
?>