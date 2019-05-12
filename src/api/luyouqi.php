<?php
    include 'conn.php';


    $sql = "SELECT * FROM shangpin LIMIT 3,4";

    $res = $conn->query($sql);

    // print_r($res);

    $content = $res->fetch_all(MYSQLI_ASSOC);
    

    echo json_encode($content,JSON_UNESCAPED_UNICODE);

?>