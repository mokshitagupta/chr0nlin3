<?php
// Replace these with your actual database credentials
require_once "db/getdb.php";

$conn = get_db();

// Check if the 'review_id' parameter is provided in the URL or in the POST data
if (isset($_REQUEST['review_id'])) {
    $review_id = $_REQUEST['review_id'];

    // SQL query to retrieve all comments and usernames based on review ID
    $sql = "
        SELECT comments.*, users.username 
        FROM comments 
        INNER JOIN users ON comments.commenter_id = users.user_id
        WHERE comments.review_id = :review_id
    ";

    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':review_id', $review_id, PDO::PARAM_INT);
    $stmt->execute();

    // Get all results as an associative array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($results) {
        echo json_encode($results);
    } else {
        // No data found for the given 'review_id'
        echo "No comments found for the review ID: $review_id";
    }
} else {
    // 'review_id' parameter is not provided
    echo "Review ID parameter is missing";
}

// Close the database connection
$conn = null;
?>