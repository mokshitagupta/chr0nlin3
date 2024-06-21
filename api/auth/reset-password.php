<?php

require_once "../db/getdb.php";
require_once "../db/db-actions.php";
// require_once "create-session.php";



$conn = get_db();

header('Content-Type: application/json');
// header("Access-Control-Allow-Origin : *");
// header("Access-Control-Allow-Credentials : true");
// header("Access-Control-Allow-Methods : PUT, POST, GET, DELETE, PATCH, OPTIONS");


// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];


// only allow post requests 
if ($method == "POST"){

    $token = $_POST['token'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password for security

    if(getUser($conn, $email, $token) > 0){
        if (resetUserPassword($conn, $email, $password)){

            $id = getUserByEmail($conn, $email)["user_id"];
            $session = generateSessionID();

            $stmt = createSessionId($conn, $id, $session);

            if ($stmt->execute()){
                http_response_code(200);
                $response = [];
                $response["sessionID"] = $session;
                $response["userID"] = $id;
                echo json_encode($response);

                // echo validateBearer($session);
                return;
            } else{
                http_response_code(403);
                echo "Unable to reset";
                return;
            }
            
        }else {
            http_response_code(403);
            echo "Unable to reset";
            return;
        }
        
    } else {
        http_response_code(404);
        echo "Invalid credentials";
    }



}

?>