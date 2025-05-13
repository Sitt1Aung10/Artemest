<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

session_start();
$_SESSION = array();
session_destroy();

if (isset($_COOKIE['username'])) {
    setcookie('username', '', time() - 3600, '/');
}
if (isset($_COOKIE['email'])) {
    setcookie('email', '', time() - 3600, '/');
}

// ✅ Proper JSON response
echo json_encode(["success" => true, "message" => "You have been logged out"]);
exit;
?>
