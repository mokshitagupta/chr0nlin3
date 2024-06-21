<?php

// echo getcwd();
require_once "../db/getdb.php";

// echo getcwd();
// // require_once "create-session.php";


// echo getcwd();
require_once "../db/db-actions.php";

// echo getcwd();

$conn = get_db();

header('Content-Type: application/json');

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

// only allow post requests 
if ($method == "POST"){


    $username = $_REQUEST['username'];
    $email = $_REQUEST['email'];
    $password = password_hash($_REQUEST['password'], PASSWORD_DEFAULT); // Hash the password for security

    if (checkUsernameInTable($conn, $username)){
        http_response_code(403);
        echo "Username taken!";
        return;
    }

    if (checkEmailInTable($conn, $email)){
        http_response_code(403);
        echo "Email taken!";
        return;
    }

    $response = [];
    // Insert user data into the database
    $create_sql = "CREATE TABLE IF NOT EXISTS users( 
        user_id INT AUTO_INCREMENT PRIMARY KEY, 
        username VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        bio TEXT, 
        profile_picture VARCHAR(255),
        grass_count INT)";

    $create_session = "CREATE TABLE IF NOT EXISTS sessions(
        session_id VARCHAR(255) PRIMARY KEY,  
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        expiration TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

    if(!checkTableExists($conn, "users")){
        //create the users table
        $stmt = $conn->prepare($create_sql);

        if (!($stmt->execute())) {
            $response["message"] += "Error: " . $stmt->error;
        }
    }
    if(!checkTableExists($conn, "sessions")){
        //create the users table
        $stmt = $conn->prepare($create_session);

        if (!($stmt->execute())) {
            $response["message"] += "
            Error: " . $stmt->error;
        }
    }

    $sql = "INSERT INTO users (username, email, password) VALUES (:user, :email, :pass)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":user",$username, PDO::PARAM_STR );
    $stmt->bindParam(":email",$email, PDO::PARAM_STR );
    $stmt->bindParam(":pass",$password, PDO::PARAM_STR );

    if ($stmt->execute()) {
        $last_inserted_ID = $conn->lastInsertId();

        $session = generateSessionID();

        $stmt = createSessionId($conn, $last_inserted_ID, $session);


        if (!($stmt->execute())) {
            $response["message"] +=  "Error: " . $stmt->error;
        } else {
            $response["sessionID"] = $session;
            $response["userID"] = $last_inserted_ID;
            $response["username"] = $username;
        }

        echo json_encode($response);
        $stmt = null;

    } else {
        $response["message"] +=  "Error: " . $stmt->error;
        $stmt = null;
    }
}

$conn = null;

?>