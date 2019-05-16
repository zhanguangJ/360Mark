<?php

    include 'conn.php';

    $phone = isset($_POST["phone"]) ? $_POST["phone"] : '';

    $password = isset($_POST["password"]) ? $_POST["password"] : '';

    $sql = "INSERT INTO userinfo (username,password, phone) VALUES ('$phone','$password','$phone')";

    $res = $conn->query($sql);

    

?>