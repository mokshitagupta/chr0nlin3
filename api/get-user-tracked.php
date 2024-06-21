<?php
// Replace these with your actual database credentials
require_once "db/getdb.php";

// $conn = get_db();

// require_once "db/db-actions.php";

$conn = get_db();

// Check if the 'userid' parameter is provided in the URL
if (isset($_GET['id'])) {
    $userid = $_GET['id'];

    // SQL query to retrieve data based on the 'userid'
    $sql = "SELECT * FROM post WHERE user_id = :id";

    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":id", $userid);
    $stmt->execute();

    // Get the result
    $result =  $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    } else {
        // No data found for the given 'userid'
        http_response_code(404);
        echo "User not found";
    }
} else {
    // 'userid' parameter not provided
    echo "Missing 'id' parameter";
}

// Close the database connection
$conn=null;
?>