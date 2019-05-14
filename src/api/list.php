<?php
    
    include 'conn.php';

    //每页数量
    $num = isset($_GET["num"]) ? $_GET["num"] : 20;
    //页码
    $page = isset($_GET["page"]) ? $_GET["page"] : 1;

    //排序方式
    $order = isset($_GET["order"]) ? $_GET["order"] : '';

    //模糊查询
    $baobei = isset($_GET["baobei"]) ? $_GET["baobei"] : '';

    $index = ($page - 1) * $num;

    //sql语句

    $sql = "SELECT * FROM shangpin";

    //查询物品
    if ($baobei) {
        $sql .= " WHERE name like '%$baobei%'";
        //查询物品的总数
        $sql2 = "SELECT * FROM shangpin WHERE name like '%$baobei%' LIMIT $index,$num";
    }else{
        //查询总数
        $sql2 = "SELECT * FROM shangpin";
    }
    //升序降序
    if ($order) {
        $sql .= " ORDER BY price $order";
    }

    $sql .= " LIMIT $index,$num";

    //执行sql语句
    $res = $conn->query($sql);
    $res2 = $conn->query($sql2);

    // echo $sql;

    $content = $res->fetch_all(MYSQL_ASSOC);

    $data = array(
        "content" => $content,
        //总数
        "total" => $res2->num_rows
    );


    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>