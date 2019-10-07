<?php
 
    //使用者資訊
    $host = "localhost";
    $user = "g06";
    $pass = "20181ncu_g06";

    //資料庫資訊
    $databaseName = "g06_test";
    $tableName = "CatIsEating";


    //連結資料庫
    $con = mysql_connect($host,$user,$pass);
    $dbs = mysql_select_db($databaseName, $con);


    //資料庫Sql query語法
    $sql = "SELECT * FROM `CatIsEating`";
    //echo $sql;
    //執行query語法
    $result = mysql_query($sql);

    //取出資料
    $data=array();
    while ($row = mysql_fetch_array($result)){
      array_push($data, $row);
    }

    //輸出並且轉成json格式
    echo json_encode($data)
?>
