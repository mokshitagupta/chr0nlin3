<?php
// Replace these with your actual database credentials
require_once "db/getdb.php";
require_once "db/db-actions.php";

header('Content-type: multipart/form-data');

// $conn = get_db();

// require_once "db/db-actions.php";

$conn = get_db();

// create table to store friends and blocked accounts
// retrieve row-column associated with current user_id
// accept friend request takes column and converts comma separated values to array
// append array
// .implode() to convert string back to csv
// update column

$new_friend = $_POST['new_friend'];
$user_id = $_POST['user_id'];
$request_id = $_POST['request_id'];

$create_user_relations = "CREATE TABLE IF NOT EXISTS user_relations (
    user_id INT NOT NULL PRIMARY KEY,
    friends TEXT NOT NULL,
    blocked TEXT DEFAULT NULL
    )";

if(!checkTableExists($conn, "user_relations")){
    $stmt = $conn->prepare($create_user_relations);

    if (!($stmt->execute())) {
        $response["message"] += "Error: " . $stmt->error;
    }
}

// $headers = getallheaders();
// echo var_dump($headers);
// $token = getSessionID($headers);
// echo var_dump($token);

// $sql = "SELECT user_id FROM sessions WHERE session_id = :id";
// $stmtPostID = $conn->prepare($sql);
// $stmtPostID->bindParam(":id", $token, PDO::PARAM_STR );
// $stmtPostID->execute();
// $user_id = 0;

// if ( $row = $stmtPostID->fetch(PDO::FETCH_ASSOC) ) {
//     $user_id = $row['user_id'];
// }

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

if($check === false){
    $insertUser = "INSERT INTO user_relations (user_id) VALUES (:user_id)";
    $stmtUser = $conn->prepare($insertUser);
    $stmtUser->bindParam(":user_id", $user_id, PDO::PARAM_STR );
    $stmtUser->execute();
}

// fix array issue should not be string

$update_friends = null;

if(strlen($friends)) {
    $update_friends = explode(",", $friends);
    if(array_search($new_friend, $update_friends) === false){
        array_push($update_friends, $new_friend);
    }
    $update_friends = implode(",", $update_friends);
} else {
    $update_friends = $new_friend;
}

$friends = $update_friends;

$sql = "UPDATE user_relations SET friends = :friends WHERE user_id = :user_id";
if(!empty($user_id) && !empty($friends)){
    $stmt = $conn->prepare($sql);
    echo "check";
} else {
    echo "here";
    http_response_code(403);
    return;
}

// $update_blocked = null;

// if(str_contains($blocked, $new_friend)){
//     echo "blocked";
//     $update_blocked = explode(",", $blocked);
//     $key = array_search($new_friend, $update_blocked);
//     unset($update_blocked[$key]);
//     $update_blocked = implode(",", $update_blocked);
//     echo var_dump($update_blocked);
//     $blocked = $update_blocked;
    
//     $sql = "UPDATE user_relations SET blocked = :blocked WHERE user_id = :user_id";
//     $stmtBlocked = $conn->prepare($sql);
//     $stmtBlocked->bindParam(":user_id", $user_id, PDO::PARAM_STR );
//     $stmtBlocked->bindParam(":blocked", $blocked, PDO::PARAM_STR );
//     $stmtBlocked->execute();
// }

// Prepare and execute the query
$stmt->bindParam(":user_id", $user_id, PDO::PARAM_STR );
$stmt->bindParam(":friends", $friends, PDO::PARAM_STR );
$stmt->execute();

// create functionality for adding new friend to sender's list of friends!!!!

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

$sender_id = $new_friend;
echo var_dump($sender_id);

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
}

$friends = $update_friends;

$sql = "UPDATE user_relations SET friends = :friends WHERE user_id = :sender_id";
if(!empty($user_id) && !empty($friends)){
    $stmt = $conn->prepare($sql);
    echo "check";
} else {
    echo "here";
    http_response_code(403);
    return;
}

// Prepare and execute the query
$stmt->bindParam(":sender_id", $sender_id, PDO::PARAM_STR );
$stmt->bindParam(":friends", $friends, PDO::PARAM_STR );
$stmt->execute();

$sql = "DELETE FROM requests WHERE request_id = :request_id";
$stmtDelete = $conn->prepare($sql);
$stmtDelete->bindParam(":request_id", $request_id, PDO::PARAM_STR );
$stmtDelete->execute();

echo var_dump($request_id);

http_response_code(200);
$stmt = null;
return;

// Close the database connection
$conn=null;
?>