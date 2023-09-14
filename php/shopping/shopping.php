<?php
header("Content-Type: application/json");
include("../Conn.php");


try {
    $input = file_get_contents('php://input');
    // echo 'Received JSON data: ' . $input;
    $data = json_decode($input, true);
    // echo 'Decoded data: ' . print_r($data, true); 
    if ($data === null) {
        echo json_encode(['error' => '無效的 JSON 数据: ' . json_last_error_msg()]);
        exit;
    }  
    // 開啟交易
    $pdo->beginTransaction();


    // 新增資料到 ORDER 表格
    $orderStatus = "無異動";
    $orderDate = $data['orderDate'];

    // 在这里添加检查 'totalPrice' 是否已定义和不为空的代码
    if (!isset($data['totalPrice']) || empty($data['totalPrice'])) {
        echo json_encode(['error' => 'totalPrice 未定義或為空']);
        exit;
    }


    $beforeTotal = $data['totalPrice'];
    $usePoints = $data['usePoints']; 
    $payPoints = $data['payPoints']; 
    $memberId = $data['memberId'];
    $items = $data['shoppingItems'];

    $insertOrderSql = "INSERT INTO `ORDER` (ORDERSTAUS, ORDERDATE, BEFORETOTAL, USEPOINTS, MEMBER_ID) 
    VALUES (:orderStatus, :orderDate, :beforeTotal, :usePoints, :memberId)";

    $stmt = $pdo->prepare($insertOrderSql);
    $stmt->bindParam(':orderStatus', $orderStatus, PDO::PARAM_STR);
    $stmt->bindParam(':orderDate', $orderDate, PDO::PARAM_STR);
    $stmt->bindParam(':beforeTotal', $beforeTotal, PDO::PARAM_INT);
    $stmt->bindParam(':usePoints', $usePoints, PDO::PARAM_INT);
    $stmt->bindParam(':memberId', $memberId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        // 插入成功
        $orderId = $pdo->lastInsertId();


        foreach ($items as $item) {
            // 先取與 $item['product'] 配對的旅館的 ID
            $hotelName = $item['product'];
            $getHotelInfoIdSql = "SELECT ID FROM HOTELINFO WHERE HOTELNAME = :hotelName";
            $stmt2 = $pdo->prepare($getHotelInfoIdSql);
            $stmt2->bindParam(':hotelName', $hotelName, PDO::PARAM_STR);
            $stmt2->execute();
            $hotelInfoRow = $stmt2->fetch(PDO::FETCH_ASSOC);
        
            if ($hotelInfoRow) {
                $hotelInfoId = $hotelInfoRow['ID'];
            } else {
                // 如果未找到匹配的旅館，則將 $hotelInfoId 設置為 null
                $hotelInfoId = null;
            }
        
            // 然後執行插入，將 $hotelInfoId 用於 HOTELINFO_ID 列
            $nowPrice = $item['spPrice'];
            $quantity = isset($item['listDistance']) ? $item['listDistance'] : $item['listDate_D'];
            $amount = $item['BuyNum'];
            $size = $item['dogSizeValue'];
            $start = $item['startadd'];
            $end = $item['endadd'];
            $startDate = $item['listDate_S'];
            $endDate = $item['listDate_E'];
            $productId = $item['listTypeValue'];
        
            $insertOrderDetailsSql = "INSERT INTO ORDERDETAILS (NOWPRICE, QUANTITY, AMOUNT, `SIZE`, `START`, `END`, STARTDATE, ENDDATE, ORDER_ID, PRODUCT_ID, HOTELINFO_ID) 
            VALUES (:nowPrice, :quantity, :amount, :size , :start, :end, :startDate, :endDate, :orderId, :productId, :hotelInfoId)";
            
            $stmt1 = $pdo->prepare($insertOrderDetailsSql);
        
            $stmt1->bindParam(':nowPrice', $nowPrice, PDO::PARAM_INT);
            $stmt1->bindParam(':quantity', $quantity, PDO::PARAM_INT);
            $stmt1->bindParam(':amount', $amount, PDO::PARAM_INT);
            $stmt1->bindParam(':size', $size, PDO::PARAM_STR);
            $stmt1->bindParam(':start', $start, PDO::PARAM_STR);
            $stmt1->bindParam(':end', $end, PDO::PARAM_STR);
            $stmt1->bindParam(':startDate', $startDate, PDO::PARAM_STR);
            $stmt1->bindParam(':endDate', $endDate, PDO::PARAM_STR);
            $stmt1->bindParam(':orderId', $orderId, PDO::PARAM_INT);
            $stmt1->bindParam(':productId', $productId, PDO::PARAM_INT);
            $stmt1->bindParam(':hotelInfoId', $hotelInfoId, PDO::PARAM_INT);
        
            $stmt1->execute();

            // 更新會員點數

            $getPointsSql = "SELECT POINTS FROM MEMBER WHERE ID = :memberId";
            $stmt4 = $pdo->prepare($getPointsSql);
            $stmt4->bindParam(':memberId', $memberId, PDO::PARAM_INT);
            $stmt4->execute();
            $memberData = $stmt4->fetch(PDO::FETCH_ASSOC);
            
            if ($memberData) {
                $currentPoints = intval($memberData['POINTS']);
            } else {
                echo json_encode(['error' => '未找到該会員']);
                exit;
            }

            // $currentPoints = 0;
            // $currentPoints = intval($currentPoints);
            $usePoints = intval($usePoints);
            $payPoints = intval($payPoints);
            // $newPoints = $currentPoints - $usePoints;
            $newPoints = $currentPoints - $usePoints + $payPoints;

            $updatePointsSql = "UPDATE MEMBER SET POINTS = :newPoints WHERE ID = :memberId";
            $stmt3 = $pdo->prepare($updatePointsSql);
            $stmt3->bindParam(':newPoints', $newPoints, PDO::PARAM_INT);
            $stmt3->bindParam(':memberId', $memberId, PDO::PARAM_INT);
            $stmt3->execute();
        }
        
    } else {
        // 插入失敗，處理錯誤
        $errorInfo = $stmt->errorInfo();
        echo json_encode(['success' => false, 'error' => '資料插入資料庫時出錯']);
        $pdo->rollback();
        exit;
    }
    $pdo->commit();

       // echo json_encode(['message' => '訂單建立成功']);
    http_response_code(200);
    // echo json_encode(['success' => true, 'message' => '訂單建立成功']);
    echo json_encode(['success' => true, 'message' => '訂單建立成功', 'order_id' => $orderId]);

} catch (PDOException $e) {
    // 回溯交易
    $pdo->rollback();
    http_response_code(500);
    echo json_encode(['error' => '訂單建立失敗：' . $e->getMessage()]);
    // echo json_encode(['success' => false, 'error' => '資料插入資料庫時出錯']);
}

?>
