<?php
    $Tempp = $_GET['temp'];
    //使用者資訊
    $host = "localhost";
    $user = "g06";
    $pass = "20181ncu_g06";

    //資料庫資訊
    $databaseName = "g06_test";
    $tableName = "TodayTemp";


    //連結資料庫
    $con = mysql_connect($host,$user,$pass);
    $dbs = mysql_select_db($databaseName, $con);


    //資料庫Sql query語法
    $sql = "UPDATE `TodayTemp` SET `temp`=$Tempp";
    echo $sql;
    //執行query語法
    $result = mysql_query($sql);

    echo $sql;
?>
