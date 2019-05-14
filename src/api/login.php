<?php
    include 'conn.php';

    $phone = isset($_GET["phone"]) ? $_GET["phone"] : '';

    $phoneLogin = isset($_POST["phoneLogin"]) ? $_POST["phoneLogin"] : '';

    $pswLogin = isset($_POST["pswLogin"]) ? $_POST["pswLogin"] : '';

    //查询用户表，此手机号是否被注册
    $sql1 = "SELECT * FROM userinfo where phone='$phone'";

    $sql2 = "SELECT * FROM userinfo where phone='$phoneLogin' AND password='$pswLogin'";


    //执行sql语句
    $res1 = $conn->query($sql1);

    $res2 = $conn->query($sql2);


    $data = array(
        'result1' => $res1->num_rows,
        'result2' => $res2->num_rows
        );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>