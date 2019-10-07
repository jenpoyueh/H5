<?php
//exec("python.exe的路徑" "執行的檔案",輸出的string存入$res)
//正常只要放python的絕對路徑就可以跑了，但上傳到伺服器沒辦法跑
exec('/usr/bin/python ./temp.py',$res);
//header('Location: lightStatusML2.py');
print_r($res);
?>
