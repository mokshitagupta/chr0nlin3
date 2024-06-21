<?php
#create a file to call this function and put in parameters 

require_once "../db/getdb.php";
// require_once "create-session.php";
require_once "../db/db-actions.php";


// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Headers: Authorization");
// header("Access-Control-Allow-Origin: '*',")

header('Content-Type: application/json');

function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
};




$conn = get_db(); #not sure where to put these variables in order for it to work
// session_start();
if(isset($_POST["username"]) && isset($_POST["password"])){
    $username = validate($_POST['username']);
    $providedpassword = validate($_POST['password']);
    $dbpassword = "";
    $entry = null;

    #the hashed pasword we gotta verify
    $stmt = "SELECT * FROM users WHERE username=:username";
    $stmt = $conn->prepare($stmt);
    $stmt->bindParam(":username", $username,PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) { #if theres a result that matches in 'users' database
        $result =  $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            // var_dump($result);
            $dbpassword = $result["password"];
            $entry = $result;
        }
    }else{
        // exit();
        http_response_code(404);
        echo "User doesn't exist - Try registering first";
        return;
    }
}

    if(password_verify($providedpassword, $dbpassword)){#if the passwords match...

        $stmt = "SELECT * FROM sessions WHERE user_id=:id";
        $stmt = $conn->prepare($stmt);
        $stmt->bindParam(":id", $entry["user_id"],PDO::PARAM_STR);
        $stmt->execute();
        
        
        if ($stmt->rowCount() > 0) { #if theres a result that matches in 'users' database
            $result =  $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {

                if ($result["expiration"] < time()){
                    $sql = "UPDATE sessions SET expiration = DATE_ADD(NOW(), INTERVAL 24 HOUR) WHERE user_id = :id"; // Replace 'your_table_name' with your table name, 'column_name' with the name of the column you want to update, and 'id' with your primary key column

                    // Prepare the query
                    $stmt = $conn->prepare($sql);

                    // Bind the parameters
                    $stmt->bindParam(':id', $entry["user_id"], PDO::PARAM_INT); // Assuming 'id' is an integer, adjust if needed

                    // Execute the query
                    $stmt->execute();


                }
                $response = [];
                $response["sessionID"] = $result["session_id"];
                $response["userID"] = $entry["user_id"];
                $response["username"] = $entry["username"];

                echo json_encode($response);
                return;
            } 
        
        }else {

            $session = generateSessionID();
            $stmt = createSessionId($conn, $entry["user_id"], $session);
            if (!($stmt->execute())) {
                $response["message"] +=  "Error: " . $stmt->error;
                return;
            } else {
                $response = [];
                $response["sessionID"] = $session;
                $response["userID"] = $entry["user_id"];
                $response["username"] = $username;
                echo json_encode($response);
                return;
            }

        }
    }else{
        // exit();
        http_response_code(403);
        echo "Invalid Credentials";
        return;
    }

?>
