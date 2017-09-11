<?php
    $to      = 'kurer.online@gmail.com';
    $headers  = 'Content-type: text/html; charset=utf-8 \r\n';
    $headers .= 'From: CallBack <call-back@aist-post.com>\r\n';

    mail($to, $subject, $message, $headers);
      
?>