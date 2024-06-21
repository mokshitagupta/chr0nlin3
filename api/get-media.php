<?php
// Replace these with your actual database credentials
require_once "db/getdb.php";

// $conn = get_db();

// require_once "db/db-actions.php";

$conn = get_db();

// Check if the 'userid' parameter is provided in the URL

$sql = "SELECT * FROM post";

// Prepare and execute the query
$stmt = $conn->prepare($sql);
$stmt->execute();

// Get the result
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($result) {
    echo json_encode($result);
} else {
    // No data found for the given 'userid'
    echo "Table not found";
}

// Close the database connection
$conn=null;
?>
