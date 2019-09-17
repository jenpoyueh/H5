<?php

    //使用者資訊
    $host = "localhost";
    $user = "poyueh";
    $pass = "nostale0618";

    //資料庫資訊
    $databaseName = "games";
    $tableName = "wheel_reply";
    $signal = $_POST['signal'];

    //連結資料庫
    $con = mysqli_connect($host,$user,$pass);
    $dbs = mysqli_select_db($con,$databaseName);


    //資料庫Sql query語法

    $sql = "INSERT INTO $tableName (`wheelSignal`) VALUES ($signal)";


    //執行query語法
    $result = mysqli_query($con,$sql);

?>