<?php


require_once "db/getdb.php";
require_once "db/db-actions.php";


$conn = get_db();

header('Content-Type: application/json');

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];


// only allow post requests 
if ($method == "POST"){

    // if friends with someone already, can't send them friend request
    
    $user_id = $_POST['user_id'];
    $request_type = $_POST['request_type'];

    $create_requests = "CREATE TABLE IF NOT EXISTS requests(
        request_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        username TEXT NOT NULL,
        request_type TEXT DEFAULT NULL
       )";

    if(!checkTableExists($conn, "requests")){
        $stmt = $conn->prepare($create_requests);

        if (!($stmt->execute())) {
            $response["message"] += "Error: " . $stmt->error;
        }
    }

    $headers = getallheaders();
    $token = getSessionID($headers);
    echo var_dump($token);

    $sql = "SELECT user_id FROM sessions WHERE session_id = :id";
    $stmtPostID = $conn->prepare($sql);
    $stmtPostID->bindParam(":id", $token, PDO::PARAM_STR );
    $stmtPostID->execute();
    $sender_id = 0;
    
    if ( $row = $stmtPostID->fetch(PDO::FETCH_ASSOC) ) {
        $sender_id = $row['user_id'];
    }

    $sql = "SELECT * FROM requests WHERE user_id = :user_id AND sender_id = :sender_id";
    $checkRequest = $conn->prepare($sql);
    $checkRequest->bindParam(":user_id", $user_id, PDO::PARAM_STR);
    $checkRequest->bindParam(":sender_id", $sender_id, PDO::PARAM_STR);
    $checkRequest->execute();

    if ( $row = $checkRequest->fetch(PDO::FETCH_ASSOC) ) {
        echo "A request has already been sent.";
        http_response_code(200);
        return;
    }

    $sql = "SELECT * FROM requests WHERE user_id = :sender_id AND sender_id = :user_id";
    $checkRequest = $conn->prepare($sql);
    $checkRequest->bindParam(":user_id", $user_id, PDO::PARAM_STR);
    $checkRequest->bindParam(":sender_id", $sender_id, PDO::PARAM_STR);
    $checkRequest->execute();

    if ( $row = $checkRequest->fetch(PDO::FETCH_ASSOC) ) {
        echo "Friend added.";
        $sql = "SELECT * FROM user_relations WHERE user_id = :id";
        $stmtFriends = $conn->prepare($sql);
        $stmtFriends->bindParam(":id", $user_id, PDO::PARAM_STR );
        $stmtFriends->execute();
        $check = true;
        $friends = null;
        $blocked = null;

        if ( $row = $stmtFriends->fetch(PDO::FETCH_ASSOC) ) {
            $friends = $row['friends'];
            $blocked = $row['blocked'];
        } else {
            $check = false;
        }

        echo var_dump($user_id);
        echo var_dump($friends);

        if($check === false){
            $insertUser = "INSERT INTO user_relations (user_id) VALUES (:user_id)";
            $stmtUser = $conn->prepare($insertUser);
            $stmtUser->bindParam(":user_id", $user_id, PDO::PARAM_STR );
            $stmtUser->execute();
        }

        // fix array issue should not be string

        $update_friends = null;
        $new_friend = $sender_id;

        if(strlen($friends)) {
            $update_friends = explode(",", $friends);
            if(array_search($new_friend, $update_friends) === false){
                array_push($update_friends, $new_friend);
            }
            $update_friends = implode(",", $update_friends);
        } else {
            $update_friends = $new_friend;
            echo var_dump($update_friends);
        }

        $friends = $update_friends;

        $sql = "UPDATE user_relations SET friends = :friends WHERE user_id = :user_id";
        if(!empty($user_id) && !empty($friends)){
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":user_id", $user_id, PDO::PARAM_STR );
            $stmt->bindParam(":friends", $friends, PDO::PARAM_STR );
            $stmt->execute();
            echo "check";
        } else {
            echo "here";
            http_response_code(403);
            return;
        }

        $sql = "SELECT * FROM user_relations WHERE user_id = :id";
        $stmtFriends = $conn->prepare($sql);
        $stmtFriends->bindParam(":id", $sender_id, PDO::PARAM_STR );
        $stmtFriends->execute();
        $check = true;
        $friends = null;
        $blocked = null;

        if ( $row = $stmtFriends->fetch(PDO::FETCH_ASSOC) ) {
            $friends = $row['friends'];
            $blocked = $row['blocked'];
        } else {
            $check = false;
        }

        echo var_dump($sender_id);
        echo var_dump($friends);

        if($check === false){
            $insertUser = "INSERT INTO user_relations (user_id) VALUES (:sender_id)";
            $stmtUser = $conn->prepare($insertUser);
            $stmtUser->bindParam(":sender_id", $sender_id, PDO::PARAM_STR );
            $stmtUser->execute();
        }

        // fix array issue should not be string

        $update_friends = null;
        $new_friend = $user_id;

        if(strlen($friends)) {
            $update_friends = explode(",", $friends);
            if(array_search($new_friend, $update_friends) === false){
                array_push($update_friends, $new_friend);
            }
            $update_friends = implode(",", $update_friends);
        } else {
            $update_friends = $new_friend;
            echo var_dump($update_friends);
        }

        $friends = $update_friends;

        $sql = "UPDATE user_relations SET friends = :friends WHERE user_id = :user_id";
        if(!empty($user_id) && !empty($friends)){
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":user_id", $sender_id, PDO::PARAM_STR );
            $stmt->bindParam(":friends", $friends, PDO::PARAM_STR );
            $stmt->execute();
            echo "check";
        } else {
            echo "here";
            http_response_code(403);
            return;
        }

        $sql = "DELETE FROM requests WHERE user_id = :sender_id AND sender_id = :user_id";
        $stmtDelete = $conn->prepare($sql);
        $stmtDelete->bindParam(":user_id", $user_id, PDO::PARAM_STR );
        $stmtDelete->bindParam(":sender_id", $sender_id, PDO::PARAM_STR );
        $stmtDelete->execute();

        http_response_code(200);
        return;
    }

    $sql = "SELECT username FROM users WHERE user_id = :id";
    $stmtPostUser = $conn->prepare($sql);
    $stmtPostUser->bindParam(":id", $sender_id, PDO::PARAM_STR );
    $stmtPostUser->execute();
    $sender = "";
    
    if ( $row = $stmtPostUser->fetch(PDO::FETCH_ASSOC) ) {
        $sender = $row['username'];
    }

    $sql = "SELECT username FROM users WHERE user_id = :id";
    $stmtPostUser = $conn->prepare($sql);
    $stmtPostUser->bindParam(":id", $user_id, PDO::PARAM_STR );
    $stmtPostUser->execute();
    $username = null;
    
    if ( $row = $stmtPostUser->fetch(PDO::FETCH_ASSOC) ) {
        $username = $row['username'];
    }

    $sql = "SELECT * FROM user_relations WHERE user_id = :id";
    $stmtFriends = $conn->prepare($sql);
    $stmtFriends->bindParam(":id", $user_id, PDO::PARAM_STR );
    $stmtFriends->execute();
    $checkFriends = true;
    $checkBlocked = true;
    $friends = null;
    $blocked = null;

    if ( $row = $stmtFriends->fetch(PDO::FETCH_ASSOC) ) {
        $friends = $row['friends'];
        $blocked = $row['blocked'];
    } else {
        $checkFriends = false;
        $checkBlocked = false;
    }

    if(strlen($friends)) {
        $friends = explode(",", $friends);
        $checkFriends = true;
    }

    if(strlen($blocked)) {
        $blocked = explode(",", $blocked);
        $checkBlocked = true;
    }

    echo var_dump($sender_id);
    echo var_dump($friends);

    if(is_array($friends)){
        if($checkFriends === true && array_search($sender_id, $friends) !== false){
            http_response_code(200);
            echo "You are already friends with this user.";
            return;
        }
    }

    if(is_array($blocked)){
        if ($checkBlocked === true && array_search($sender_id, $blocked) !== false) {
            http_response_code(200);
            echo "You are blocked by this user.";
            return;
        }
    }
    
    if($checkFriends === true && $sender_id === $friends){
        http_response_code(200);
        echo "You are already friends with this user.";
        return;
    } elseif($checkBlocked === true && $sender_id === $blocked){
        http_response_code(200);
        echo "You are blocked by this user.";
        return;
    }

    $sql = "INSERT INTO requests (user_id, username, request_type, sender, sender_id) VALUES (:user_id, :username, :request_type, :sender, :sender_id)";
    if(!empty($user_id) && !empty($request_type)){
        $stmt = $conn->prepare($sql);
        echo "check";
    } else {
        echo "here";
        http_response_code(403);
        return;
    }

    $stmt->bindParam(":user_id",$user_id, PDO::PARAM_STR );
    $stmt->bindParam(":username",$username, PDO::PARAM_STR );
    $stmt->bindParam(":request_type",$request_type, PDO::PARAM_STR );
    $stmt->bindParam(":sender",$sender, PDO::PARAM_STR );
    $stmt->bindParam(":sender_id",$sender_id, PDO::PARAM_STR );

    if ($stmt->execute()){
        echo "and check";

        http_response_code(200);
        $stmt = null;
        return;

    } else {
        echo "it's here";
        $response["message"] +=  "Error: " . $stmt->error;
        $stmt = null;
        http_response_code(403);
        return;
    }
    return;
}

$conn = null;

?>