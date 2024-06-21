<?php
// Replace these with your actual database credentials
require_once "db/getdb.php";
require_once "db/db-actions.php";

// $conn = get_db();

// require_once "db/db-actions.php";

$conn = get_db();

// create table to store friends and blocked accounts
// retrieve row-column associated with current user_id
// accept friend request takes column and converts comma separated values to array
// append array
// .implode() to convert string back to csv
// update column

$user_id = $_POST['user_id'];
$new_blocked = $_POST['new_blocked'];

$create_user_relations = "CREATE TABLE IF NOT EXISTS user_relations (
    user_id INT NOT NULL PRIMARY KEY,
    friends TEXT NOT NULL,
    blocked TEXT DEFAULT NULL
    )";

if(!checkTableExists($conn, "requests")){
    $stmt = $conn->prepare($create_user_relations);

    if (!($stmt->execute())) {
        $response["message"] += "Error: " . $stmt->error;
    }
}

// $headers = getallheaders();
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
$stmtBlocked = $conn->prepare($sql);
$stmtBlocked->bindParam(":id", $user_id, PDO::PARAM_STR );
$stmtBlocked->execute();
$check = true;
$friends = null;
$blocked = null;

if ( $row = $stmtBlocked->fetch(PDO::FETCH_ASSOC) ) {
    $friends = $row['friends'];
    $blocked = $row['blocked'];
} else {
    $check = false;
}

if($check === false){
    $insertUser = "INSERT INTO user_relations (user_id) VALUES (:user_id)";
    $stmtUser = $conn->prepare($insertUser);
    $stmtUser->bindParam(":user_id", $user_id, PDO::PARAM_STR );
    $stmtUser->execute();
}

// fix array issue should not be string

$update_blocked = null;

if(strlen($blocked)) {
    $update_blocked = explode(",", $blocked);
    if(array_search($new_blocked, $update_blocked) === false){
        array_push($update_blocked, $new_blocked);
    }
    $update_blocked = implode(",", $update_blocked);
} else {
    $update_blocked = $new_blocked;
}

$blocked = $update_blocked;
echo var_dump($friends);
echo var_dump($new_blocked);
echo var_dump($user_id);
echo var_dump($blocked);

$sql = "UPDATE user_relations SET blocked = :blocked WHERE user_id = :user_id";
if(!empty($user_id) && !empty($blocked)){
    $stmt = $conn->prepare($sql);
    echo "check";
} else {
    echo "here";
    http_response_code(403);
    return;
}

$update_friends = null;

if(str_contains($friends, $new_blocked)){
    echo "friends";
    $update_friends = explode(",", $friends);
    $key = array_search($new_blocked, $update_friends);
    unset($update_friends[$key]);
    $update_friends = implode(",", $update_friends);
    echo var_dump($update_friends);
    $friends = $update_friends;
    
    $sql = "UPDATE user_relations SET friends = :friends WHERE user_id = :user_id";
    $stmtFriends = $conn->prepare($sql);
    $stmtFriends->bindParam(":user_id", $user_id, PDO::PARAM_STR );
    $stmtFriends->bindParam(":friends", $friends, PDO::PARAM_STR );
    $stmtFriends->execute();
}

// Prepare and execute the query
$stmt->bindParam(":user_id", $user_id, PDO::PARAM_STR );
$stmt->bindParam(":blocked", $blocked, PDO::PARAM_STR );
$stmt->execute();

$sql = "DELETE FROM requests WHERE sender_id = :blocked";
$stmtDelete = $conn->prepare($sql);
$stmtDelete->bindParam(":blocked", $blocked, PDO::PARAM_STR );
$stmtDelete->execute();

http_response_code(200);
$stmt = null;
return;

// Close the database connection
$conn=null;
?>