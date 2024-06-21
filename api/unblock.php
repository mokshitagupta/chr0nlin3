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

$unblock = $_POST['unblock'];
$user_id = $_POST['user_id'];

$sql = "SELECT * FROM user_relations WHERE user_id = :id";
$stmtBlocked = $conn->prepare($sql);
$stmtBlocked->bindParam(":id", $user_id, PDO::PARAM_STR );
$stmtBlocked->execute();
$blocked = null;

if ( $row = $stmtBlocked->fetch(PDO::FETCH_ASSOC) ) {
    $blocked = $row['blocked'];
}

$update_blocked = explode(",", $blocked);
$key = array_search($unblock, $update_blocked);
unset($update_blocked[$key]);
$update_blocked = implode(",", $update_blocked);
echo var_dump($update_blocked);
$blocked = $update_blocked;

$sql = "UPDATE user_relations SET blocked = :blocked WHERE user_id = :user_id";
$stmtBlocked = $conn->prepare($sql);
$stmtBlocked->bindParam(":user_id", $user_id, PDO::PARAM_STR );
$stmtBlocked->bindParam(":blocked", $blocked, PDO::PARAM_STR );
$stmtBlocked->execute();

echo var_dump($user_id);
http_response_code(200);
$stmt = null;
return;

// Close the database connection
$conn=null;
?>