<?php

require_once "../db/getdb.php";
require_once "../db/db-actions.php";


$conn = get_db();

header('Content-Type: application/json');
// header("Access-Control-Allow-Origin : *");
// header("Access-Control-Allow-Credentials : true");
// header("Access-Control-Allow-Methods : PUT, POST, GET, DELETE, PATCH, OPTIONS");


// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];


// only allow post requests 
if ($method == "POST"){
    $email = $_POST["email"];

    var_dump( $_POST);
    echo $_POST["email"];

    echo checkEmailInTable($conn, $email);

    if (checkEmailInTable($conn, $email)){
        $tok = getForgotToken($conn, $email);
        mail($email,"Chronline Password Reset Token","Here's your reset token: ". $tok);
        return;
    } else {
        http_response_code(404);
        echo "Email is not associated with an account";
        return;
    }
}

$conn = null;

?>