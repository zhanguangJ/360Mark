<?php

    include 'conn.php';

    //根据用户名查ID
    $username = isset($_GET["username"]) ? $_GET["username"] : '';

    $sql1 = "SELECT * FROM userinfo where username='$username'";

    $res1 = $conn->query($sql1);

    $content1 = $res1->fetch_all(MYSQLI_ASSOC);

    $uId = $content1[0]['id'];   

    $num = isset($_GET["num"]) ? $_GET["num"] : '';
    $gId = isset($_GET["gId"]) ? $_GET["gId"] : '';
    $totalprice = isset($_GET["totalprice"]) ? $_GET["totalprice"] : '';

    $sql2 = "UPDATE showcart SET num=$num,totalprice=$totalprice WHERE userId=$uId AND shangpinId=$gId";

    $res2 = $conn->query($sql2);

    // var_dump($sql2);

    if ($res2) {
        echo 1;
    }else{
        echo 0;
    }

?>