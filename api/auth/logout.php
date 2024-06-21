<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Include the database connection code
    require_once "../db/getdb.php"; // Make sure the path is correct
    //require_once "../auth/create-session.php";
    // Include the db-actions.php file
    require_once "../db/db-actions.php"; // Make sure the path is correct

    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    // header('Access-Control-Request-Method: POST');

    // Initialize variables to store the data
    $username = null;
    $sessionID = null;
    $userID = null;
    
    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    };

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
        // echo "testing ->  Username: " . $username . "\n";
        // echo "testing ->  Session ID: " . $sessionID . "\n";
        // echo "testing ->  User ID: " . $userID . "\n";

    } else {
        echo json_encode(["error" => "Invalid request method"]);
        exit;
    }

    $database = get_db();

    if ($database) {
        // Database connection successful
        
        // Check if the sessionID and userID exist in the sessions table
        $checkSessionSql = "SELECT user_id FROM sessions WHERE session_id = :sessionID AND user_id = :userID";
        $checkSessionStmt = $database->prepare($checkSessionSql);
        $checkSessionStmt->bindParam(":sessionID", $sessionID, PDO::PARAM_STR);
        $checkSessionStmt->bindParam(":userID", $userID, PDO::PARAM_INT);
        $checkSessionStmt->execute();
        
        if ($checkSessionStmt->rowCount() > 0) {
            // SessionID and userID found in the same row, proceed with logout
    
            // Delete the row from the sessions table
            $deleteSql = "DELETE FROM sessions WHERE session_id = :sessionID";
            $deleteStmt = $database->prepare($deleteSql);
            $deleteStmt->bindParam(":sessionID", $sessionID, PDO::PARAM_STR);
        
            if ($deleteStmt->execute()) {
                // SessionID deleted successfully
                http_response_code(200);
                echo json_encode(["message" => "SessionID deleted"]);
            } else {
                // Failed to delete SessionID
                http_response_code(500);
                echo json_encode(["error" => "Failed to delete SessionID"]);
            }
        } else {
            // SessionID or userID not found in the same row
            http_response_code(400);
            echo json_encode(["error" => "SessionID or User ID not found in sessions table"]);
        }
    } else {
        // Database connection failed
        http_response_code(500);
        echo json_encode(["error" => "Database connection failed"]);
    }

?>