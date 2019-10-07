<?php

    //使用者資訊
    $host = "localhost";
    $user = "g06";
    $pass = "20181ncu_g06";

    //資料庫資訊
    $databaseName = "g06_test";
    $tableName = "CatFoodWeight";


    //連結資料庫
    $con = mysql_connect($host,$user,$pass);
    $dbs = mysql_select_db($databaseName, $con);


    //資料庫Sql query語法
    $sql = "SELECT * FROM $tableName";

    //執行query語法
    $result = mysql_query($sql);

    //取出資料
    $data=array();
    $data=sqlreturn($data,$tableName);

    //輸出並且轉成json格式
    echo json_encode($data);

function sqlreturn($data,$tableName){
for($i=1;$i<=7;$i++){


    $sql="";
    $sql="
    SELECT sum(startWeight),sum(endWeight)
    FROM $tableName
    WHERE TIME
    BETWEEN  TIMESTAMP(CURRENT_DATE( )-$i )
    AND ADDTIME( TIMESTAMP(CURRENT_DATE( )-$i ),  '11:59:59.997' )
    ";
        //執行query語法
    $result = mysql_query($sql);
    while ($row = mysql_fetch_array($result)){
      array_push($data, $row);
    }


}
return $data;
}
?>
