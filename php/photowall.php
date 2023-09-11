<?php

    include("./Conn.php");

    //判斷是否上傳成功
    if($_FILES["profile"]["error"] > 0){
        echo json_encode(["status" => "error", "message" => "上傳失敗: 錯誤代碼" . $_FILES["profile"]["error"]]);
    } else {
        //取得上傳的檔案資訊
        $fileName = $_FILES["profile"]["name"];         
        $filePath_Temp = $_FILES["profile"]["tmp_name"];

        //Web根目錄真實路徑
        $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
        
        //檔案最終存放位置
        $filePath = $ServerRoot."/images/pic/photoWall/".$fileName;
  
        //將暫存檔搬移到正確位置
        move_uploaded_file($filePath_Temp, $filePath);

        // 從LocalStorage中取得memberData
        // $token = $_POST['memberData'];
        
        // $sql2 = "select ID from MEMBER where EMAIL = $token";

        //當前日期
        $currentDate = date("Y-m-d");
        //資料庫操作
        $sql = "INSERT INTO `petpago`.`STICKERS` (`POSTDATE`, `PIC`, `MODE`, `MEMBER_ID`) VALUES (:postDate, :pic, b'1', b'1')";
        $stmt = $pdo->prepare($sql);
        
        $stmt->bindParam(":postDate", $currentDate, PDO::PARAM_STR);
        $stmt->bindParam(":pic", $filePath, PDO::PARAM_STR);
        // $stmt->bindParam(":mode", $mode, PDO::PARAM_LOB); //
        // $stmt->bindParam(":member_id", $member_id, PDO::PARAM_LOB);

        if($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "上傳成功且已儲存到資料庫"]);
        } else {
            echo json_encode(["status" => "error", "message" => "儲存到資料庫失敗"]);
        }
    }

?>