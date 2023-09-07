<?php
include("../Conn.php");
    $ID = $_GET('MEMBER_ID');

    $sql_pre = "SELECT ID FROM `MEMBER` WHERE `EMAIL` == $ID";
    $stmt = $pdo->query($sql_pre);
    echo $stmt;


    //建立SQL語法
    // $sql = "SELECT
    //         od.ORDER_ID,
    //         od.NOWPRICE,
    //         od.QUANTITY,
    //         od.AMOUNT,
    //         od.SIZE,
    //         od.START,
    //         od.END,
    // IF(
    //   DATE_FORMAT(od.STARTDATE, '%Y-%m-%d') = DATE_FORMAT(od.ENDDATE, '%Y-%m-%d'),
    //   CONCAT(DATE_FORMAT(od.STARTDATE, '%m - %d'), ' | ', DATE_FORMAT(od.STARTDATE, '%H:%i')),
    //   CONCAT(DATE_FORMAT(od.STARTDATE, '%m-%d'), ' - ', DATE_FORMAT(od.ENDDATE, '%m-%d'))
    // ) AS display_date,
    //     pr.PRODUCTNAME,
    //     IFNULL(hi.HOTELNAME, '寵物接送') AS display_hotelname
    //     FROM ORDERDETAILS od
    //     LEFT JOIN `ORDER` o ON od.ORDER_ID = o.ID
    //     LEFT JOIN HOTELINFO hi ON od.HOTELINFO_ID = hi.ID
    //     LEFT JOIN PRODUCT pr ON od.PRODUCT_ID = pr.ID
    //     WHERE o.MEMBER_ID = 1 AND o.ID = $ID;";

    // 執行
    // $statement = $pdo->prepare($sql);
    // $statement -> execute();

    // $data = $statement -> fetchAll();

    // // 壓碼成 JSON
    // echo json_encode($data);


    ?>
