<?php
// Replace these with your actual database credentials
require_once "db/getdb.php";
require_once "db/db-actions.php";

// $conn = get_db();

// require_once "db/db-actions.php";

$conn = get_db();

// Check if the 'userid' parameter is provided in the URL

// $headers = getallheaders();
// $token = getSessionID($headers);
// echo var_dump($token);

// $sql = "SELECT user_id FROM sessions WHERE session_id = :id";
// $stmtFilter = $conn->prepare($sql);
// $stmtFilter->bindParam(":id", $token, PDO::PARAM_STR );
// $stmtFilter->execute();
// $user_id = 0;

// if ( $row = $stmtFilter->fetch(PDO::FETCH_ASSOC) ) {
//     $user_id = $row['user_id'];
// }

$sql = "SELECT * FROM requests";

// Prepare and execute the query
$stmt = $conn->prepare($sql);
// $stmt->bindParam(":user_id", $user_id, PDO::PARAM_STR );
$stmt->execute();

// Get the result
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($result) {
    echo json_encode($result);
    http_response_code(200);
    $stmt = null;
    return;
} else {
    // No data found for the given 'userid'
    echo "Table not found";
}

// Close the database connection
$conn=null;
?>