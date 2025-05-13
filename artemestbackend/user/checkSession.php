<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");


session_start();

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


if (isset($_SESSION['username'])) {
    echo json_encode([
        "sessionActive" => true,
        "userEmail" => $_SESSION['username']
    ]);
} else {
    echo json_encode(["sessionActive" => false]);
}
