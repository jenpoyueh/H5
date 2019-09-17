<?php

    //使用者資訊
    $host = "localhost";
    $user = "poyueh";
    $pass = "nostale0618";

    //資料庫資訊
    $databaseName = "games";
    $tableName = "game_value_006";


    //連結資料庫
    $con = mysqli_connect($host,$user,$pass);
    $dbs = mysqli_select_db($con,$databaseName);


    //資料庫Sql query語法
    $sql = "SELECT * FROM $tableName";

    //執行query語法
    $result = mysqli_query($con,$sql);

    //取出資料
    $data=array();
    while ($row = mysqli_fetch_array($result)){
      array_push($data, $row);
    }

    //輸出並且轉成json格式
    echo json_encode($data);
?>
