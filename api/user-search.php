<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Include the database connection code from your existing code
    require_once "../api/db/getdb.php";
    require_once "../api/db/db-actions.php";

    // Set the Content-Type header to specify JSON response
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

    try {
        // Try to establish the database connection
        $database = get_db();

        // Check if the database connection was successful
        if ($database === null) {
            http_response_code(500); // Internal Server Error
            echo "Database connection failed. Please check your database configuration.";
        } else {
            // Check if it's a POST request with JSON data
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $requestData = json_decode(file_get_contents("php://input"), true);

                if ($requestData !== null && isset($requestData['search'])) {
                    $searchedString = '%' . $requestData['search'] . '%';

                    // Modify this SQL query to search for similar usernames in the user table
                    $sql = "SELECT username FROM users WHERE (LOWER(username) LIKE LOWER(:search))";
                    
                    $stmt = $database->prepare($sql);
                    $stmt->bindParam(':search', $searchedString, PDO::PARAM_STR);
                    $stmt->execute();

                    // Check if there are any rows in the result set
                    if ($stmt->rowCount() > 0) {
                        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        http_response_code(200); // OK
                        echo json_encode($results);
                    } else {
                        http_response_code(404); // Not Found
                        echo json_encode(["message" => "No matching usernames found."]);
                    }
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(["message" => "Invalid JSON data format. Please provide a valid JSON object with a 'search' field."]);
                }
            }
        }
    } catch (Exception $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
?>
