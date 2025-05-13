<?php
// Start output buffering to prevent any prior output
ob_start();

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

// Retrieve POST parameters
$productName = $_POST['productName'] ?? '';
$productKind = $_POST['productKind'] ?? '';
$productPrice = $_POST['productPrice'] ?? '';
$shippingTime = $_POST['shippingTime'] ?? '';

$imageName = '';
$uploadDir = "uploads/";

// Process file upload if provided
if (isset($_FILES['productImage']) && $_FILES['productImage']['error'] === UPLOAD_ERR_OK) {
    $imageName  = basename($_FILES['productImage']['name']);
    $uploadPath = $uploadDir . $imageName;
    if (!move_uploaded_file($_FILES['productImage']['tmp_name'], $uploadPath)) {
        ob_clean();
        echo json_encode([
            'success' => false,
            'message' => 'Image upload failed'
        ]);
        exit;
    }
}

// Prepare and execute the INSERT statement
$stmt = $conn->prepare("INSERT INTO `$productKind` (productName, productKind, productPrice, productImage, shippingTime , productDetails) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $productName, $productKind, $productPrice, $imageName, $shippingTime);

if ($stmt->execute()) {
    ob_clean();  // Clear any buffered output
    echo json_encode([
        'success' => true,
        'message' => 'Product added successfully'
    ]);
} else {
    ob_clean();
    echo json_encode([
        'success' => false,
        'message' => 'Database insert failed'
    ]);
}

$stmt->close();
$conn->close();

