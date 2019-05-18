<?php

    include 'conn.php';

    $username = isset($_GET["username"]) ? $_GET["username"] : '';


    $sql1 = "SELECT * FROM userinfo where username='$username'";

    $res1 = $conn->query($sql1);

    $content1 = $res1->fetch_all(MYSQLI_ASSOC);

    $uId = $content1[0]['id'];
    //在购物车中查询用户Id
    $sql2 = "SELECT * FROM showcart where userId=$uId";

    $res2 = $conn->query($sql2);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    // var_dump($content2);

    $ar = array();
    $ar1 = array();
    foreach($content2 as $k=>$v){
        //查询每一个的商品Id
        $ar[] = $v['shangpinId'];
        $ar1[] = $v['num'];
    }
    // echo json_encode($ar1,JSON_UNESCAPED_UNICODE);
    //遍历，
    $num = count($ar);
    for($i=0;$i<$num;++$i){ 
        $sql3 = "SELECT * FROM shangpin where id=$ar[$i]";
        $res3 = $conn->query($sql3);
        $content3 = $res3->fetch_all(MYSQLI_ASSOC);
        echo json_encode($content3,JSON_UNESCAPED_UNICODE);
    } 


?>