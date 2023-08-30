<?php

include("./Conn.php");


//---------------------------------------------------

// 過濾特殊字元 ex： HTML tag
$keywords = htmlspecialchars($_POST["keywords"]);
$like = '%'.$keywords.'%';

//建立SQL
$sql = "SELECT * FROM MEMBER WHERE EMAIL LIKE ?";
// echo $sql;

// 執行
$statement = $pdo->prepare($sql);
$statement -> bindValue(1, $like); 
$statement -> execute();

$data = $statement -> fetchAll();
if(count($data) > 0){
  foreach($data as $index => $row){
    echo $row["NAME"];   //欄位名稱
    echo " / ";
    echo $row["PASSWORD"];    //欄位名稱
    echo " / ";
    echo $row["EMAIL"];    //欄位名稱
         echo "<br>";
  };
}else{
    echo "無關鍵字!";
}


?>