<?php

// echo getcwd();

function generateSessionID($length = 10) {
    $bytes = random_bytes($length);
    return bin2hex($bytes);
}

function getSessionID($headers){

    if (isset($headers['Authorization'])) {
        $authorizationHeader = $headers['Authorization'];

        if (strpos($authorizationHeader, 'Bearer') === 0) {
            $accessToken = trim(substr($authorizationHeader, 7));

            return $accessToken;
        } else {
            return "";
        }
    }
}



function checkTableExists($conn, $name){
    $table_exists = false;
    $check_users = "SHOW TABLES LIKE :name";
    $table_check_stmt = $conn->prepare($check_users);
    $table_check_stmt->bindParam(":name",$name, PDO::PARAM_STR);
    $table_check_stmt->execute();

    if ($table_check_stmt->rowCount() > 0) {
        // The table exists
        return true;
    } else {
        // The table does not exist
        return false;
    }
}

function checkUsernameInTable($conn, $val){
    $sql = "SELECT * FROM users WHERE username = :val";
    $stmt = $conn->prepare($sql);
    // $stmt->bindParam(':table', $table, PDO::PARAM_STR);
    // $stmt->bindParam(":param", $param, PDO::PARAM_STR);
    $stmt->bindParam(":val", $val, PDO::PARAM_STR);

    $stmt->execute();

    // Fetch the results
    $existing_user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($existing_user){
        return true;
    }
    return false;
}

function checkEmailInTable($conn, $val){
    $sql = "SELECT * FROM users WHERE email = :val";
    $stmt = $conn->prepare($sql);
    // $stmt->bindParam(':table', $table, PDO::PARAM_STR);
    // $stmt->bindParam(":param", $param, PDO::PARAM_STR);
    $stmt->bindParam(":val", $val, PDO::PARAM_STR);

    $stmt->execute();

    // Fetch the results
    $existing_user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($existing_user){
        return true;
        // echo $existing_user;
    }
    return false;
}

function checkIDInTable($conn, $val){
    $sql = "SELECT * FROM users WHERE user_id = :val";
    $stmt = $conn->prepare($sql);
    // $stmt->bindParam(':table', $table, PDO::PARAM_STR);
    // $stmt->bindParam(":param", $param, PDO::PARAM_STR);
    $stmt->bindParam(":val", $val, PDO::PARAM_STR);

    $stmt->execute();

    // Fetch the results
    $existing_user = $stmt->fetch(PDO::FETCH_ASSOC);

    return $existing_user;
}

function getForgotToken($conn, $email){

    if( !(checkTableExists($conn, "reset_tokens"))){
        $create_sql = "CREATE TABLE IF NOT EXISTS reset_tokens( 
            token_id INT AUTO_INCREMENT PRIMARY KEY, 
            token VARCHAR(255), 
            expiration TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            email VARCHAR(255));";
        
        $stmt = $conn->prepare($create_sql);

        if (!($stmt->execute())) {
            echo $stmt->error;
        } 
    }
    $limit = 24; //hours;
    $stmt = "SELECT *
    FROM reset_tokens
    WHERE email = :email AND NOW() <= DATE_ADD(expiration, INTERVAL 24 HOUR);";

    $stmt = $conn->prepare($stmt);
    $stmt->bindParam(":email",$email, PDO::PARAM_STR );

    if (!($stmt->execute())) {
        echo $stmt->error;
    } else{
        if ($stmt->rowCount() > 0){
            $tok = "";
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $tok = $row["token"];
            }

            return $tok;

        } else {
            $sql = "INSERT INTO reset_tokens (email, token) VALUES (:email, :token)";
            $stmt = $conn->prepare($sql);

            $tok = generateSessionID();

            $stmt->bindParam(":token",$tok, PDO::PARAM_STR );
            $stmt->bindParam(":email",$email, PDO::PARAM_STR );

            $stmt->execute();
            return $tok;
        }
    }

}

function getUserByEmail($conn, $email){
    $sql = "SELECT * FROM users WHERE email = :email ;";
    $stmt = $conn->prepare($sql);
    // $stmt->bindParam(':table', $table, PDO::PARAM_STR);
    // $stmt->bindParam(":param", $param, PDO::PARAM_STR);
    
    // $stmt->bindParam(":label", $label, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() == 0){
        return [];
    }

    // Fetch the results
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        return $row;
    }
}

function getUserById($conn, $id){
    $sql = "SELECT * FROM users WHERE email = :email ;";
    $stmt = $conn->prepare($sql);
    // $stmt->bindParam(':table', $table, PDO::PARAM_STR);
    // $stmt->bindParam(":param", $param, PDO::PARAM_STR);
    
    // $stmt->bindParam(":label", $label, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() == 0){
        return [];
    }

    // Fetch the results
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        return $row;
    }
}

function getUser($conn, $email, $token){
    $sql = "SELECT * FROM reset_tokens WHERE email = :email AND token = :token";
    $stmt = $conn->prepare($sql);
    // $stmt->bindParam(':table', $table, PDO::PARAM_STR);
    // $stmt->bindParam(":param", $param, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":token", $token, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() == 0){
        return -1;
    }

    // Fetch the results
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        return 1;
    }
}

function createSessionId($conn, $id, $session){

    $sql = "INSERT INTO sessions (session_id, user_id, expiration) VALUES (:session, :last, NOW() + INTERVAL 24 HOUR)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":session",$session, PDO::PARAM_STR );
    $stmt->bindParam(":last",$id, PDO::PARAM_STR );

    return $stmt;

}

function resetUserPassword($conn, $email, $newval){

    $sql = "UPDATE users
    SET password = :newval
    WHERE email = :email;";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":newval", $newval, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);

    if (!($stmt->execute())){
        return false;
    } 
    
    return true;



}

function validateBearer($conn, $headers, $username){

    $token = getSessionID($headers);

    if ($token == ""){
        return false;
    }else {
        $stmt = "SELECT *
        FROM sessions
        WHERE session_id = :id AND NOW() <= DATE_ADD(expiration, INTERVAL 24 HOUR);";

        $stmt = $conn->prepare($stmt);
        $stmt->bindParam(":id",$token, PDO::PARAM_STR );

        if (($stmt->execute())){
            $data = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($data !== false) {
                if ($username == $data["user_id"]){
                    return true;
                }
            } else {
                return false;
            }

            return false;
        }else{
            if($stmt->rowCount() == 0){
                return false;
            }
        }
    }
}


function getMediaByUser($conn, $user){
    $sql = "SELECT * FROM media WHERE user = :user ;";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":user", $user, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() == 0){
        return [];
    }

    // Fetch the results
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        return $row;
    }
}

?>