<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["message" => "Invalid input"]);
    exit;
}

$email = htmlspecialchars($data->email);
$password = htmlspecialchars($data->password);

$conn = new mysqli("localhost", "root", "", "artemest");
if ($conn->connect_error) {
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$resultCheck = $stmt->get_result();

if ($resultCheck->num_rows > 0) {
    echo json_encode(["message" => "User already exists!"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $password);
if ($stmt->execute()) {
    echo json_encode(["message" => "Signup successful"]);
} else {
    echo json_encode(["message" => "Signup failed"]);
}
?>
