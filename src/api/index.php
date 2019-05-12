<?php
    //连接数据库
    include 'conn.php';

     $id = isset($_GET['id']) ? $_GET['id'] : '';

    //sql语句
    if ($id ==1 ) {
        $sql = "SELECT * FROM hotgoods";
    }else if($id == 2){
        $sql = "SELECT * FROM shangpin LIMIT 3,4";
    }else if($id == 3){
        $sql = "SELECT * FROM shangpin LIMIT 7,4";
    }
    else {
        $sql = "SELECT * FROM shangpin LIMIT 3,10000000";
    }
    
    

    //执行sql语句
    $res = $conn->query($sql);

    //获取结果集里面的内容
    $content = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($content,JSON_UNESCAPED_UNICODE);

?>