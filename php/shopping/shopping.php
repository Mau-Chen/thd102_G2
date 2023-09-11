<?php
include("../Conn.php");

try {
    // 開啟交易
    $pdo->beginTransaction();

    if (isset($_POST['totalPrice'])) {
        // 在這裡使用 $_POST['totalPrice'] 來執行操作
        $totalPrice = $_POST['totalPrice'];
        // 其他操作...
    } else {
        // 如果 'totalPrice' 未定義，可以處理錯誤或執行其他操作
        echo json_encode(['error' => 'totalPrice 未定義']);
    }

    // $totalPrice = $_POST['totalPrice']; 
    $usePoints = $_POST['usePoints']; 
    $member_data = $_POST['member_data'];
    $items = $_POST['items'];

    // 插入資料到 ORDER 表格
    $orderStatus = "無異動";
    $orderDate = date("Y-m-d H:i:s");
    $beforeTotal = $totalPrice;
    $usePoints = $usePoints;
    $memberId = $member_data['id'];

    $insertOrderSql = "INSERT INTO `ORDER` (ORDERSTATUS, ORDERDATE, BEFORETOTAL, USEPOINTS, MEMBER_ID) VALUES (:orderStatus, :orderDate, :beforeTotal, :usePoints, :memberId)";
    $stmt = $pdo->prepare($insertOrderSql);
    $stmt->bindParam(':orderStatus', $orderStatus, PDO::PARAM_STR);
    $stmt->bindParam(':orderDate', $orderDate, PDO::PARAM_STR);
    $stmt->bindParam(':beforeTotal', $beforeTotal, PDO::PARAM_INT);
    $stmt->bindParam(':usePoints', $usePoints, PDO::PARAM_INT);
    $stmt->bindParam(':memberId', $memberId, PDO::PARAM_INT);
    $stmt->execute();

    // 獲取剛插入的訂單的 ID
    $orderId = $pdo->lastInsertId();

    // 插入資料到 ORDERDETAILS 表格
    foreach ($items as $item) {
        $nowPrice = $item['spPrice'];
        $quantity = isset($item['listDistance']) ? $item['listDistance'] : $item['listDate_D'];
        $amount = $item['BuyNum'];
        $size = $item['dogSize'];
        $start = $item['startadd'];
        $end = $item['endadd'];
        $startDate = $item['listDate_S'];
        $endDate = $item['listDate_E'];
        $productId = $item['listType'];
        $hotelInfoId = $item['product'];

        $insertOrderDetailsSql = "INSERT INTO ORDERDETAILS (NOWPRICE, QUANTITY, AMOUNT, SIZE, START, END, STARTDATE, ENDDATE, ORDER_ID, PRODUCT_ID, HOTELINFO_ID) VALUES (:nowPrice, :quantity, :amount, :size, :start, :end, :startDate, :endDate, :orderId, :productId, :hotelInfoId)";
        $stmt = $pdo->prepare($insertOrderDetailsSql);
        $stmt->bindParam(':nowPrice', $nowPrice, PDO::PARAM_INT);
        $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
        $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
        $stmt->bindParam(':size', $size, PDO::PARAM_STR);
        $stmt->bindParam(':start', $start, PDO::PARAM_STR);
        $stmt->bindParam(':end', $end, PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
        $stmt->bindParam(':orderId', $orderId, PDO::PARAM_INT);
        $stmt->bindParam(':productId', $productId, PDO::PARAM_INT);
        $stmt->bindParam(':hotelInfoId', $hotelInfoId, PDO::PARAM_INT);
        $stmt->execute();
    }

    // 提交交易
    $pdo->commit();

    echo json_encode(['message' => '訂單建立成功']);
} catch (PDOException $e) {
    // 回滾交易
    $pdo->rollback();

    echo json_encode(['error' => '訂單建立失敗：' . $e->getMessage()]);
}
?>
