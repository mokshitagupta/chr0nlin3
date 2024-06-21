<?php


require_once "db/getdb.php";
require_once "db/db-actions.php";


$conn = get_db();

header('Content-Type: application/json');

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];


// only allow post requests 
if ($method == "POST"){
    
    $media_name = $_POST['media_name'];
    $creator = $_POST['creator'];
    $media_type = $_POST['media_type'];
    $media_review = $_POST['media_review'];
    $media_rating = $_POST['media_rating'];
    $media_img = $_POST['media_img'];
    $media_id = $_POST['media_id'];

    $response = [];
    $create_post = "CREATE TABLE IF NOT EXISTS post(
        post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        username TEXT NOT NULL,
        media_id INT NOT NULL UNIQUE KEY,
        media_name TEXT NOT NULL,
        creator TEXT NOT NULL,
        media_type TEXT NOT NULL,
        media_review TEXT NULL,
        media_rating INT NOT NULL,
        media_img TEXT DEFAULT NULL)";

    if(!checkTableExists($conn, "post")){
        $stmt = $conn->prepare($create_post);

        if (!($stmt->execute())) {
            $response["message"] += "Error: " . $stmt->error;
        }
    }

    $create_media = "CREATE TABLE IF NOT EXISTS media(
        media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        media_name TEXT NOT NULL,
        creator TEXT NOT NULL,
        media_type TEXT NOT NULL,
        score INT DEFAULT NULL,
        media_img TEXT DEFAULT NULL
       )";

    if(!checkTableExists($conn, "media")){
        $stmt = $conn->prepare($create_media);

        if (!($stmt->execute())) {
            $response["message"] += "Error: " . $stmt->error;
        }
    }

    // $create_ratings = "CREATE TABLE IF NOT EXISTS ratings(
    //     rating_id INT NOT NULL AUTO_INCREMENT,
    //     media_id INT NOT NULL,
    //     user_id INT NULL,
    //     media_rating INT NOT NULL,
    //     created_at TIMESTAMP NOT NULL,
    //     media_review TEXT NOT NULL,
    //     PRIMARY KEY (`rating_id`)
    //    )";

    // if(!checkTableExists($conn, "ratings")){
    //     $stmt = $conn->prepare($create_ratings);

    //     if (!($stmt->execute())) {
    //         $response["message"] += "Error: " . $stmt->error;
    //     }
    // }

    $headers = getallheaders();
    $token = getSessionID($headers);
    echo var_dump($token);

    $sql = "SELECT user_id FROM sessions WHERE session_id = :id";
    $stmtPostID = $conn->prepare($sql);
    $stmtPostID->bindParam(":id", $token, PDO::PARAM_STR );
    $stmtPostID->execute();
    $user_id = 0;
    
    if ( $row = $stmtPostID->fetch(PDO::FETCH_ASSOC) ) {
        $user_id = $row['user_id'];
    }

    $sql = "SELECT username FROM users WHERE user_id = :id";
    $stmtPostUser = $conn->prepare($sql);
    $stmtPostUser->bindParam(":id", $user_id, PDO::PARAM_STR );
    $stmtPostUser->execute();
    $username = "";

    if ( $row = $stmtPostUser->fetch(PDO::FETCH_ASSOC) ) {
        $username = $row['username'];
    }

    $sql = "INSERT INTO post (user_id, username, media_id, media_name, creator, media_type, media_rating, media_review, media_img) VALUES (:user_id, :username, :media_id, :media_name, :creator, :media_type, :media_rating, :media_review, :media_img)";
    if(!empty($user_id) && !empty($username) && !empty($media_id) && !empty($media_name) &&  !empty($creator) 
        && !empty($media_type) && !empty($media_rating) &&  !empty($media_review)){
        $stmtPost = $conn->prepare($sql);
    } else {
        http_response_code(403);
        return;
    }

    // $sql = "INSERT INTO ratings (user_id, media_rating, media_review) VALUES (:user_id, :media_rating, :media_review)";
    // if(!empty($media_rating) &&  !empty($media_review)){
    //     $stmtRating = $conn->prepare($sql);
    // } else {
    //     http_response_code(403);
    //     return;
    // }

    // functionality for nonexistent media!!!!

    // $sql = "SELECT * FROM media WHERE media_name = :media_name AND creator = :creator";
    // $checkMedia = $conn->prepare($sql);
    // $checkMedia->bindParam(":media_name", $media_name, PDO::PARAM_STR);
    // $checkMedia->execute();

    // if ( !$row = $checkMedia->fetch(PDO::FETCH_ASSOC) ) {
    //     $sql = "INSERT INTO media (media_name, creator, media_type) VALUES (:media_name, :creator, :media_type)";
    //     if(!empty($media_name) &&  !empty($creator) && !empty($media_type)){
    //         $stmtMedia = $conn->prepare($sql);
    //     } else {
    //         http_response_code(403);
    //         return;
    //     }
    // } 

    $stmtPost->bindParam(":user_id",$user_id, PDO::PARAM_STR );
    $stmtPost->bindParam(":username",$username, PDO::PARAM_STR );
    $stmtPost->bindParam(":media_id",$media_id, PDO::PARAM_STR );
    $stmtPost->bindParam(":media_name",$media_name, PDO::PARAM_STR );
    $stmtPost->bindParam(":creator",$creator, PDO::PARAM_STR );
    $stmtPost->bindParam(":media_type",$media_type, PDO::PARAM_STR );
    $stmtPost->bindParam(":media_rating",$media_rating, PDO::PARAM_STR );
    $stmtPost->bindParam(":media_review",$media_review, PDO::PARAM_STR );
    $stmtPost->bindParam(":media_img",$media_img, PDO::PARAM_STR );

    // $stmtMedia->bindParam(":media_name",$media_name, PDO::PARAM_STR );
    // $stmtMedia->bindParam(":creator",$creator, PDO::PARAM_STR );
    // $stmtMedia->bindParam(":media_type",$media_type, PDO::PARAM_STR );

    if ($stmtPost->execute()){ //&& $stmtMedia->execute()

        http_response_code(200);
        $stmtPost = null;
        // $stmtRating = null;
        $stmtMedia = null;
        return;

    } else {
        $response["message"] +=  "Error: " . $stmtPost->error;
        // $response["message"] +=  "Error: " . $stmtRating->error;
        // $response["message"] +=  "Error: " . $stmtMedia->error;
        $stmtPost = null;
        // $stmtRating = null;
        // $stmtMedia = null;
        http_response_code(403);
        return;
    }
    return;
}

$conn = null;

?>