<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = new mysqli('localhost', 'root', '', 'artemest');
if ($conn->connect_error) {
    echo json_encode(['error' => 'DB connect failed: ' . $conn->connect_error]);
    exit();
}

mysqli_set_charset($conn, "utf8");

$tables = ['seating', 'table','storage','outdoor_furniture'];
$allProducts = [];

foreach ($tables as $tableName) {
    $sql = "SELECT id, productID, productImage, productName, productKind, productPrice, instock , shippingTime , productDetails , material FROM `$tableName`";
    $result = $conn->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['category'] = $tableName;
            $allProducts[] = $row;
        }
    } else {
        echo json_encode(['error' => "Query failed for `$tableName`: " . $conn->error]);
        $conn->close();
        exit();
    }
}

echo json_encode($allProducts);
$conn->close();
?>
