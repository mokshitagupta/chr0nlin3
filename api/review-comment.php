<?php


require_once "./db/getdb.php";

require_once "./db/db-actions.php";


$conn = get_db();

header('Content-Type: application/json');

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];


// only allow post requests 
if ($method == "POST"){

    $review_id = $_POST['review_id'];
    $commenter_id = $_POST['commenter_id'];
    $comment = $_POST['comment'];
    

    $response = [];
    $create_post = "CREATE TABLE IF NOT EXISTS post(

        review_id INT NOT NULL,
        commenter_id INT NOT NULL,
        comment TEXT NOT NULL
        )";


    if(!checkTableExists($conn, "post")){
        $stmt = $conn->prepare($create_post);

        if (!($stmt->execute())) {
            $response["message"] += "Error: " . $stmt->error;
        }
    }


    $create_comments = "CREATE TABLE IF NOT EXISTS comments(
        review_id INT NOT NULL,
        commenter_id INT NOT NULL,
        comment TEXT NOT NULL
       )";

    if(!checkTableExists($conn, "comments")){
        $stmt = $conn->prepare($create_comments);

        if (!($stmt->execute())) {
            $response["message"] += "Error: " . $stmt->error;
        }
    }

    

    $headers = getallheaders();
    
    $token = getSessionID($headers);


    $sql = "INSERT INTO post (review_id, commenter_id, comment) VALUES (:review_id, :commenter_id, :comment)";

    echo $review_id;
    echo $commenter_id;
    echo $comment;

    if(!empty($review_id) && !empty($commenter_id) && !empty($comment)){
        $stmtPost = $conn->prepare($sql);
    } else {
        echo "1st";
        http_response_code(403);
        return;
    }


    $sql = "INSERT INTO comments (review_id, commenter_id, comment) VALUES (:review_id, :commenter_id, :comment)";
    if(!empty($review_id) && !empty($commenter_id) && !empty($comment)){
        $stmtComment = $conn->prepare($sql);
    } else {
        http_response_code(403);
        return;
    }

    $stmtPost->bindParam(":review_id",$review_id, PDO::PARAM_STR );
    $stmtPost->bindParam(":commenter_id",$commenter_id, PDO::PARAM_STR );
    $stmtPost->bindParam(":comment",$comment, PDO::PARAM_STR );

    $stmtComment->bindParam(":review_id",$review_id, PDO::PARAM_STR );
    $stmtComment->bindParam(":commenter_id",$commenter_id, PDO::PARAM_STR );
    $stmtComment->bindParam(":comment",$comment, PDO::PARAM_STR );

    if ($stmtComment->execute()){

        http_response_code(200);
        $stmtPost = null;
        $stmtComment = null;
        return;

    } else {
        $response["message"] +=  "Error: " . $stmtPost->error;
        $response["message"] +=  "Error: " . $stmtComment->error;
        $stmtPost = null;
        $stmtComment = null;
        echo "2nd";
        http_response_code(403);
        return;
    }
    return;
}

$conn = null;

?>