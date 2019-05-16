<?php
    
    include 'conn.php';

    $username = isset($_GET["username"]) ? $_GET["username"] : '';

    $data = isset($_GET["data"]) ? $_GET["data"] : '';

    $sql1 = "SELECT * FROM userinfo where username='$username'";

    $res1 = $conn->query($sql1);

    $content1 = $res1->fetch_all(MYSQLI_ASSOC);
    //获取用户Id
    $uId = $content1[0]['id'];

/*    $sql2 = "SELECT * FROM showcart WHERE userId=$uId";

    $res2 = $conn->query($sql2);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);*/

    // var_dump($content2);

    // echo json_encode($content2,JSON_UNESCAPED_UNICODE);
    //数量
    $sql2 = "SELECT sum(num) FROM showcart where userId=$uId";
    //总价
    $sql3 = "SELECT sum(totalprice) FROM showcart where userId=$uId";

    $res2 = $conn->query($sql2);
    $res3 = $conn->query($sql3);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);
    $content3 = $res3->fetch_all(MYSQLI_ASSOC);

    // var_dump($content3);

    // echo json_encode($content2,JSON_UNESCAPED_UNICODE);

    // $arr = array(
    //     "num" => json_encode($content2,JSON_UNESCAPED_UNICODE),
    //     "total" => json_encode($content3,JSON_UNESCAPED_UNICODE)
    // );

    if ($data ==1) {
        # code...
        echo json_encode($content2,JSON_UNESCAPED_UNICODE);
    }else{
        echo json_encode($content3,JSON_UNESCAPED_UNICODE);
    }


?>