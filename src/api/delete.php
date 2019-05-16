<?php
    include 'conn.php';

    $username = isset($_GET["username"]) ? $_GET["username"] : '';

    $gid = isset($_GET["gid"]) ? $_GET["gid"] : '';

    $sql1 = "SELECT * FROM userinfo where username='$username'";

    $res1 = $conn->query($sql1);

    $content1 = $res1->fetch_all(MYSQLI_ASSOC);

    //用户ID
    $uId = $content1[0]['id'];

    $sql = "DELETE FROM showcart WHERE userId=$uId AND shangpinId=$gid";

    $res = $conn->query($sql);

    if ($res) {
        echo 1;
    }else{
        echo 0;
    }
?>