<?php
    
    include "conn.php";

    $username = isset($_GET["username"]) ? $_GET["username"] : '';

    $sql1 = "SELECT * FROM userinfo where username='$username'";

    $res1 = $conn->query($sql1);

    $content1 = $res1->fetch_all(MYSQLI_ASSOC);

    $uId = $content1[0]['id'];    

    $sql2 = "SELECT * FROM showcart where userId=$uId";

    $res2 = $conn->query($sql2);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);


    echo json_encode($content2,JSON_UNESCAPED_UNICODE);


?>