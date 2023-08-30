<?php

       include("./Conn.php");

       //---------------------------------------------------

       //建立SQL語法
       $sql = "SELECT * FROM member ORDER BY CreateDate desc Limit 1";

       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $pdo->query($sql);

       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();
       // print_r($data);

       echo json_encode($data);

       /*
       // fetchAll() 會把關聯索引 和 一般索引 都封裝
       Array ( 
              [0] => Array ( 
                     [Account] => 王小明 
                     [PWD] => Tibame123 
                     [CreateDate] => 2023-08-12 10:26:37 
                     
                     [0] => 王小明 
                     [1] => Tibame123 
                     [2] => 2023-08-12 10:26:37 ) 
              [1] => Array ( 
                     [Account] => 王小明
                     [PWD] => Tibame123 
                     [CreateDate] => 2023-08-12 11:00:36 
                     
                     [0] => 王小明 
                     [1] => Tibame123 
                     [2] => 2023-08-12 11:00:36 ) )
*/

       //將二維陣列取出顯示其值
       // foreach($data as $index => $row){
	//        echo $row["Account"];   //欄位名稱
	//        echo " / ";
	//        echo $row["PWD"];    //欄位名稱
	//        echo " / ";
	//        echo $row["CreateDate"];    //欄位名稱
       //        echo "<br>";
       // }

?>