<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Include the database connection code
    require_once "../db/getdb.php"; // Make sure the path is correct
    //require_once "../auth/create-session.php";
    // Include the db-actions.php file
    require_once "../db/db-actions.php"; // Make sure the path is correct

    // Set the Content-Type header to specify JSON response
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    //header('Access-Control-Request-Method: POST');

    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    };

    // Initialize variables to store the data
    $username = null;
    $sessionID = null;
    $userID = null;

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        // Get the JSON data from the request body
        $json_data = file_get_contents("php://input");

        // Decode the JSON data into an associative array
        $data = json_decode($json_data, true);

        // Check if the JSON data was successfully parsed
        if ($data !== null) {
            if (isset($data['sessionID'])) {
                $sessionID = validate($data['sessionID']);
            }
            if (isset($data['userID'])) {
                $userID = validate($data['userID']);
            }
            if (isset($data['username'])) {
                $username = validate($data['username']);
            }
        } else {
            // JSON parsing failed
            echo json_encode(["error" => "Invalid JSON data"]);
            exit;
        }
        echo "testing ->  Username: " . $username . "\n";
        echo "testing ->  Session ID: " . $sessionID . "\n";
        echo "testing ->  User ID: " . $userID . "\n";

    } else {
        echo json_encode(["error" => "Invalid request method"]);
        exit;
    }

    $database = get_db();

    // if ($database) {
    //     // Database connection successful

    //     // Delete the user from the sessions table
    //     $deleteSessionSql = "DELETE FROM sessions WHERE user_id = :userID";
    //     $deleteSessionStmt = $database->prepare($deleteSessionSql);
    //     $deleteSessionStmt->bindParam(":userID", $userID, PDO::PARAM_INT);
        
    //     if ($deleteSessionStmt->execute()) {
    //         // User deleted from sessions table
            
    //         // Delete the user from the users table
    //         $deleteUserSql = "DELETE FROM users WHERE user_id = :userID";
    //         $deleteUserStmt = $database->prepare($deleteUserSql);
    //         $deleteUserStmt->bindParam(":userID", $userID, PDO::PARAM_INT);

    //         if ($deleteUserStmt->execute()) {
    //             // User deleted from users table
    //             echo json_encode(["message" => "User and associated sessions deleted"]);
    //         } else {
    //             // Failed to delete user from users table
    //             echo json_encode(["error" => "Failed to delete user from users table"]);
    //         }
    //     } else {
    //         // Failed to delete user from sessions table
    //         echo json_encode(["error" => "Failed to delete user from sessions table"]);
    //     }
    // } else {
    //     // Database connection failed
    //     echo json_encode(["error" => "Database connection failed"]);
    // }

    
    if ($database) {
        // Check if the sessionID and userID exist in the sessions table
        $checkSessionSql = "SELECT user_id FROM sessions WHERE session_id = :sessionID AND user_id = :userID";
        $checkSessionStmt = $database->prepare($checkSessionSql);
        $checkSessionStmt->bindParam(":sessionID", $sessionID, PDO::PARAM_STR);
        $checkSessionStmt->bindParam(":userID", $userID, PDO::PARAM_INT);
        $checkSessionStmt->execute();

        if ($checkSessionStmt->fetch(PDO::FETCH_ASSOC)) {
            // Check if the username and userID exist in the users table
            $checkUserSql = "SELECT user_id FROM users WHERE username = :username AND user_id = :userID";
            $checkUserStmt = $database->prepare($checkUserSql);
            $checkUserStmt->bindParam(":username", $username, PDO::PARAM_STR);
            $checkUserStmt->bindParam(":userID", $userID, PDO::PARAM_INT);
            $checkUserStmt->execute();

            if ($checkUserStmt->fetch(PDO::FETCH_ASSOC)) {
                // All required data exists in the database, proceed with deletion
                $deleteSessionSql = "DELETE FROM sessions WHERE user_id = :userID";
                $deleteSessionStmt = $database->prepare($deleteSessionSql);
                $deleteSessionStmt->bindParam(":userID", $userID, PDO::PARAM_INT);

                if ($deleteSessionStmt->execute()) {
                    // User deleted from sessions table

                    $deleteUserSql = "DELETE FROM users WHERE user_id = :userID";
                    $deleteUserStmt = $database->prepare($deleteUserSql);
                    $deleteUserStmt->bindParam(":userID", $userID, PDO::PARAM_INT);

                    if ($deleteUserStmt->execute()) {
                        // User deleted from users table
                        http_response_code(200); // 200 OK response
                        echo json_encode(["message" => "User and associated sessions deleted"]);
                    } else {
                        // Failed to delete user from users table
                        http_response_code(400);
                        echo json_encode(["error" => "Failed to delete user from users table"]);
                    }
                } else {
                    // Failed to delete user from sessions table
                    http_response_code(400);
                    echo json_encode(["error" => "Failed to delete user from sessions table"]);
                }
            } else {
                // The username or userID doesn't exist in the users table, so return a 400 error
                http_response_code(400);
                echo json_encode(["error" => "Username or User ID not found in users table"]);
            }
        } else {
            // The sessionID or userID doesn't exist in the sessions table, so return a 400 error
            http_response_code(400);
            echo json_encode(["error" => "Session ID or User ID not found in sessions table"]);
        }
    } else {
        // Database connection failed
        http_response_code(500);
        echo json_encode(["error" => "Database connection failed"]);
    }
    
?>
