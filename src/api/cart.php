<?php
    include 'conn.php';
    // //用户名
    $username = isset($_GET["username"]) ? $_GET["username"] : '';
    // 商品ID
    $goodsId = isset($_GET["goodsId"]) ? $_GET["goodsId"] : '';

    // //sql语句
    $sql1 = "SELECT * FROM userinfo where username='$username'";
    $sql2 = "SELECT * FROM shangpin where id='$goodsId'";
    //查询购物车表
    $sql4 = "SELECT * FROM showcart where shangpinId = '$goodsId'";
    //查询商品表
    $sql5 = "SELECT * FROM shangpin where id = '$goodsId'";

    $res1 = $conn->query($sql1);
    $res2 = $conn->query($sql2);
    $res4 = $conn->query($sql4);
    $res5 = $conn->query($sql5);

    $content1 = $res1->fetch_all(MYSQLI_ASSOC);
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);
    $content4 = $res4->fetch_all(MYSQLI_ASSOC);
    $content5 = $res5->fetch_all(MYSQLI_ASSOC);

    //用户ID
    $uId = $content1[0]['id'];

    $gnum = $res4->num_rows;

    //如果存在跟新数据
    if($gnum > 0 ){
        $num = $content4[0]['num'];
        $gprice = $content5[0]['price'];
        $num1 = $num+1;
        $totalprice1 = $gprice * $num1;
        $sql3 = "UPDATE showcart SET num=$num1,totalprice=$totalprice1 WHERE userid='$uId' AND shangpinId='$goodsId'";
    }else{   
        $gprice = $content2[0]['price'];
        // 反之往购物车插入数据
        $sql3 = "INSERT INTO showcart (shangpinId,userId,num,totalprice) VALUES ($goodsId,$uId,1,$gprice)";
    }

    $res3 = $conn->query($sql3);

    if ($res3) {
        echo 1;
    }else{
        echo 0;
    }

    // $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    // echo json_encode($content2,JSON_UNESCAPED_UNICODE);

?>