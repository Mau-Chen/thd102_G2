<?php
// 預先設定的帳號和密碼
$rootAccount = 'admin@g2';
$rootPassword = '12345678';

// 獲取 POST 資料
$account = isset($_POST['account']) ? $_POST['account'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

// 比較帳號和密碼是否相等
if ($account === $rootAccount && $password === $rootPassword) {
    // 如果相等，回傳 JSON 格式的成功訊息
    header('Content-Type: application./json');
    echo json_encode(['status' => 'success']);
} else {
    // 如果不相等，回傳 JSON 格式的失敗訊息
    header('Content-Type: application./json');
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
}
?>
