<?php
// Include the database connection code from your existing code
require_once "../db/getdb.php";
require_once "../db/db-actions.php";

$database = get_db();

setcookie('session_id', '12345', time() + 3600, '/'); // Adjust the expiration time and path as needed

if (isset($_POST['username'])) {
    $searchedUsername = '%' . $_POST['username'] . '%'; // Add '%' on both sides to search for usernames that contain the input

    try {
        // Prepare a SQL query to retrieve user data from the "users" table based on the user input
        $sql = "SELECT * FROM users WHERE username LIKE :username";
        $stmt = $database->prepare($sql);
        $stmt->bindParam(':username', $searchedUsername, PDO::PARAM_STR);
        $stmt->execute();

        // Check if there are any rows in the result set
        if ($stmt->rowCount() > 0) {
            // Fetch and print the user data
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "User ID: " . $row['user_id'] . "<br>";
                echo "Username: " . $row['username'] . "<br>";
                echo "Email: " . $row['email'] . "<br>";
                echo "Password: " . $row['password'] . "<br>";
                echo "Created at: " . $row['created_at'] . "<br>";
                echo "Bio: " . $row['bio'] . "<br>";
                echo "______________ " . "<br>";
            }
        } else {
            echo "No users found with usernames containing '$searchedUsername'";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Search for User</title>
</head>
<body>
    <form method="post" action="">
        <label for="username">Enter Username:</label>
        <input type="text" name="username" id="username">
        <input type="submit" value="Search">
    </form>
</body>
</html>
