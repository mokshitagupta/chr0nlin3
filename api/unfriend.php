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

$unfriend = $_POST['unfriend'];
$user_id = $_POST['user_id'];

$sql = "SELECT * FROM user_relations WHERE user_id = :id";
$stmtFriends = $conn->prepare($sql);
$stmtFriends->bindParam(":id", $user_id, PDO::PARAM_STR );
$stmtFriends->execute();
$friends = null;

if ( $row = $stmtFriends->fetch(PDO::FETCH_ASSOC) ) {
    $friends = $row['friends'];
}

$stmtFriends = null;

$update_friends = explode(",", $friends);
$key = array_search($unfriend, $update_friends);
unset($update_friends[$key]);
$update_friends = implode(",", $update_friends);
echo var_dump($update_friends);
$friends = $update_friends;

$sql = "UPDATE user_relations SET friends = :friends WHERE user_id = :user_id";
$stmtFriends = $conn->prepare($sql);
$stmtFriends->bindParam(":user_id", $user_id, PDO::PARAM_STR );
$stmtFriends->bindParam(":friends", $friends, PDO::PARAM_STR );
$stmtFriends->execute();

echo var_dump($user_id);
http_response_code(200);
$stmt = null;
return;

// Close the database connection
$conn=null;
?>