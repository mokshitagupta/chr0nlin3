<?php
    //echo "testing cock sucka ";
    function get_db(){

        $env = parse_ini_file('.env');
        $username = $env["USERNAME"];
        // Database configuration
        $servername = $env["SERVERNAME"]; // Change to your MySQL server address
        $password = $env["PASSWORD"]; // Change to your MySQL password
        $dbname = $env["DBNAME"]; // Change to your database name

        // Create a connection to the database
        try {
            //echo "cock and oiled up ball sacks ";
            $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    //$cock = get_db()


?>