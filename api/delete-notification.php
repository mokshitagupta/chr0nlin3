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

$request_id = $_POST['request_id'];

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