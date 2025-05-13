<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");


session_start();

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get and decode JSON body
$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$email = htmlspecialchars($data->email);
$password = htmlspecialchars($data->password); // Don't hash it yet!

// Connect to DB
$conn = new mysqli("localhost", "root", "", "artemest");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Look up user by email
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit;
}

$user = $result->fetch_assoc();

if ($password === $user['password']) {

    if(isset($_POST['rememberMe'])) {
        setcookie("username", $user['email'], time() + (86400 * 30), "/"); 
    } else {
        setcookie("username", $user['email'], time() + (3600 * 24), "/"); 
    }
    $_SESSION['username'] = $user['email'] ?? ''; // or 'email' if 'name' not available

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "username" => $_SESSION['username']
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Incorrect password"]);
}

$conn->close();
?>
