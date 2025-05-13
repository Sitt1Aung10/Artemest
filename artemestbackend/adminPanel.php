<?php

// Disable error display to avoid sending HTML error messages in the output
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

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

$query = "SELECT id , productID , productName , productPrice ,productKind ,buyerName , phoneNumber ,address , amount FROM purchase_products ";
$result = $conn->query($query);


// Check for query errors
if (!$result) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Query failed.'
    ]);
    exit;
}

// Fetch data
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Respond with JSON
echo json_encode([
    'success' => true,
    'data' => $products
]);

$conn->close();
