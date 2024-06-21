<?php

require_once "../db/getdb.php";
require_once "../db/db-actions.php";


$conn = get_db();


header('Content-Type: application/json');

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

// only allow post requests 
if ($method == "POST"){
    $headers = getallheaders();
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);
    // echo "hii";
    if ($data == null) {
        http_response_code(404);
        echo $data["userID"];
        echo "nothing in body";
        return;
    }

    // print_r( validateBearer($conn, $headers, $data["userID"])); 

    if( validateBearer($conn, $headers, $data["userID"])){
        http_response_code(200);
        echo "verified";
    }else{
        http_response_code(404);
        echo "Invalid credentials";
    }
}


?>