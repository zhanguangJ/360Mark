<?php
    include 'conn.php';
    $id = isset($_GET['id']) ? $_GET['id'] : 1;

    $sql = "SELECT * FROM shangpin where id=$id";
    //执行sql语句
    $res = $conn->query($sql);

    //获取结果集里面的内容
    $content = $res->fetch_all(MYSQLI_ASSOC);

    // var_dump($content);

    echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>