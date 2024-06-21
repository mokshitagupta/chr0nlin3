<?php
// Replace these with your actual database credentials
require_once "db/getdb.php";
require_once "db/db-actions.php";

// $conn = get_db();

// require_once "db/db-actions.php";

$conn = get_db();
$user_id = $_POST['user_id'];

// Check if the 'userid' parameter is provided in the URL

$headers = getallheaders();
$token = getSessionID($headers);

$sql = "SELECT user_id FROM sessions WHERE session_id = :id";
$stmtFilter = $conn->prepare($sql);
$stmtFilter->bindParam(":id", $token, PDO::PARAM_STR );
$stmtFilter->execute();

if ( $row = $stmtFilter->fetch(PDO::FETCH_ASSOC) ) {
    $user_id = $row['user_id'];
}

$sql = "SELECT * FROM user_relations WHERE user_id = :id";

// Prepare and execute the query
$stmt = $conn->prepare($sql);
$stmt->bindParam(":id", $user_id, PDO::PARAM_STR );
$stmt->execute();

// Get the result
if ( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
    $friends = $row['friends'];
}
$friendUsers = [];
$users = null;

if(strlen($friends)) {
    $friends = explode(",", $friends);
    $sql = "SELECT username, user_id FROM users WHERE user_id IN (" . implode(",", $friends) . ")";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
//     $users = explode(",", $friends);
//     foreach ($users as $friend) {
//         $sql = "SELECT username FROM users WHERE user_id = :friend";
//         $stmt = $conn->prepare($sql);
//         $stmt->bindParam(":friend", $friend, PDO::PARAM_STR );
//         $stmt->execute();
//         $user = $stmt->fetch(PDO::FETCH_ASSOC);
//         array_push($friendUsers, $user['username']);
//     }
//     $friends = explode(",", $friends);
}



if ($users) {
    echo json_encode($users);
    http_response_code(200);
    $stmt = null;
    return;
}

// Close the database connection
$conn=null;
?>