<?php

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $to = "1337gamingelite@gmail.com";
    $subject = $_POST['subject'];

    mail($to, $subject, $message, "From: " . $first_name . $last_name);
    echo "Your Message has been Sent";

?>
