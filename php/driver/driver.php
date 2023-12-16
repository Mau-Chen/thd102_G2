<?php 
    //請參考PDO課後作業-關鍵字查詢的Search.php

    include("../Conn.php");

//---------------------------------------------------

//建立SQL
$sql = "SELECT * FROM petpago.PRODUCT WHERE ID = 1 || ID = 2;";

// 執行
$statement = $pdo->query($sql);

$data = $statement -> fetchAll();

// // 壓碼成 JSON
echo json_encode($data);

?>