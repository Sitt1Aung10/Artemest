<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Establish database connection
$conn = new mysqli('localhost', 'root', '', 'artemest');
if ($conn->connect_error) {
    // Clear any buffered output before sending JSON
    ob_clean();
    echo json_encode([
        'success' => false, 
        'message' => 'DB connection failed'
    ]);
    exit;
}

$productID = $_POST['productID'] ?? '';
$productName = $_POST['productName'] ?? '';
$productPrice = $_POST['productPrice'] ?? '';
$productKind = $_POST['productKind'] ?? '';
$buyerName = $_POST['buyerName'] ?? '';
$phoneNumber = $_POST['phoneNumber'] ?? '';
$address = $_POST['address'] ?? '';
$amount = $_POST['amount'] ?? '1'; // default to 1 if not sent

// Prepare and execute the INSERT statement  
$stmt = $conn->prepare("INSERT INTO `purchase_products` (productID ,productName, productPrice,  productKind, buyerName , phoneNumber ,address , amount) VALUES (?, ? ,?, ?, ?, ?, ? ,?)");
$stmt->bind_param("ssssssss",$productID , $productName, $productPrice, $productKind,  $buyerName, $phoneNumber,$address, $amount);

// ✅ Only one execution
$success = $stmt->execute();

$stmt->close();
$conn->close();

if ($success) {
    header("Location: http://localhost:3000/furniture?status=success");
} else {
    header("Location: http://localhost:3000/furniture?status=fail");
}
exit;

