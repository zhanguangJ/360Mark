<?php
    
    include 'conn.php';

    //每页数量
    $num = isset($_GET["num"]) ? $_GET["num"] : 20;
    //页码
    $page = isset($_GET["page"]) ? $_GET["page"] : 1;

    $index = ($page - 1) * $num;

    $sql1 = "SELECT * FROM shangpin LIMIT $index,$num";

    $res1 = $conn->query($sql1);

    $content = $res1->fetch_all(MYSQL_ASSOC);

    //查询总数
    $sql2 = "SELECT * FROM shangpin";

    $res2 = $conn->query($sql2);

    $data = array(
        "content" => $content,
        //总数
        "total" => $res2->num_rows
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>