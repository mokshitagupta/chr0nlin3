# PHP

# Overview

<aside>
💡 PHP stands for “PHP: Hypertext Processor”

</aside>

- PHP is a very powerful language and can handle running large social networks.
- Since PHP utilizes HTML, CSS, JavaScript, and PHP so it’s important to have an understanding of all of them
- PHP has the capability to run servers
    - Collect data
    - Modify, delete, create files
    - Send and receive cookies
    - Access / support databases
    - Control user-access
- PHP runs on all operating systems and is compatible with almost all servers
- So long as a server can support PHP, all that is needed is dropping in a .php file and it will parse the file on its own
- PHP is loosely typed, meaning the type is determined by the value it represents
    - This also allows things like strings and integers being added together without error

# Basics

```php
<?php
	// code goes here
?>
```

When using PHP code, all you need to do to write a script is surround it with **<?php** and **?>** as shown above. All code must be followed by a semicolon ( **;** ).

By placing a command such as **echo** within the script, you can print text to the screen:

```php
<?php 
	echo "Hello, World!";
?>
```

Commands are not case-sensitive. However, variable names are. Variable names in PHP are preceded by **$**. They must be alphanumeric and begin with a letter or underscore. If HTML tags are used within PHP script, they must be surrounded by double quotes.

```php
<?php
	$fruit = "apple"
	echo "My favorite fruit is an " . $fruit . "<br>";
	echo "My favorite fruit is an $fruit";
?>
```

Variables can be inserted into output text in both ways shown above.

Note that variables can be either global or local. If a variable is declared within a function, it is considered to be local to that function. If it is declared outside of the function, it is then considered to be global.

```php
<?php
$v = 4
function myFunc() {
	$x = 2
	$y = 3
	$z = $x + $y + $v
}
```

**$v** is global and can be accessed within **myFunc()**, however, **$x**, **$y**, and **$z** can’t be accessed outside of it.

Comments can be written in multiple ways

```php
<?php
// single line comment
# single line comment

/*
	multiple
	line
	comment
*/
?>
```

# Server

## Cookies

```php
setcookie(name, value, expire, path, domain, secure, httponly);
```

The above function can be used to set a cookie. Cookies store user information as a means of being able to recognize them should they visit at a later date. The most important and only parameter that needs to be set is the “name”. All others are completely optional. For instance, if you would like a cookie to only be triggered when a user goes to a particular page on the server, you can set the path it’s associated with. “Expire” will tell when the cookie should be deleted. “Value” could be the id or name of a user.

The setcookie() function *must* be used before the **<html>** tag.

A cookie can be deleted by calling setcookie() with a negative value for “expire”.

```php
setcookie("name", "james", -3600)
```

## Databases

If PHP and MySQL are used together, they can be utilized across all platforms.

One of the most common operations used in MySQL is database queries. Database queries can be used to retrieve data from an entire table, certain columns, or rows that fit a certain criteria. The possibilities are endless.

```sql
SELECT * FROM books
```

The above operation will select all columns from table “books” and retrieve all values. The asterisk (*) character is a way to specify all values are being requested, similar to a period (**.**) on the command line or within Dockerfiles.

## Connecting to Databases (MySQL)

Before PHP and MySQL can be used together, a connection must be established to the SQL database you will be accessing and the MySQLi extension must be installed. This can be done with or without objects in PHP.

### Object-Oriented

<aside>
💡 Note the below method is broken on versions of PHP preceding PHP 5.29

</aside>

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
```

### MySQLi Procedural

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";

// Create connection
$conn = mysqli_connect($servername, $username, $password);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
?>
```

Rather than operate on an object, this method calls functions that perform the same thing.

## Connecting to Databases (PDO)

Another means of connecting to databases is through PHP Data Objects (PDO). As opposed to MySQLi which can only work with MySQL databases, PDO has the ability to work with 12 different database systems, allowing more flexibility if you are employing multiple. 

Additionally, PDO has a way to set up exception handling with try and catch blocks, making it effective in catching exceptions.

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";

try {
  $conn = new PDO("mysql:host=$servername;dbname=myDB", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?>
```

## Closing the Connection

The connection will close once the script is done running, however, there may a situation in which it needs to be closed prematurely. If a connection is required to perform only one, quick task, it’s probably best to close it as soon as you can.

> MySQLi (Objects)
> 

```php
$conn->close();
```

> MySQLi (Procedural)
> 

```php
mysqli_close($conn);
```

> PDO
> 

```php
$conn = null;
```

## Creating a Database

In order to create databases, you will require certain privileges. From there a **CREATE DATABASE** statement can be used to start the process.

This statement must be sent over the connection.

### MySQLi (Objects)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE myDB";
if ($conn->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . $conn->error;
}

$conn->close();
?>
```

### MySQLi (Procedural)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";

// Create connection
$conn = mysqli_connect($servername, $username, $password);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Create database
$sql = "CREATE DATABASE myDB";
if (mysqli_query($conn, $sql)) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
```

### PDO

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";

try {
  $conn = new PDO("mysql:host=$servername", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "CREATE DATABASE myDBPDO";
  // use exec() because no results are returned
  $conn->exec($sql);
  echo "Database created successfully<br>";
} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
```

## Creating a Table

A **CREATE TABLE** statement can be used to declare the kinds of values each column in the table will contain.

```sql
CREATE TABLE exampleTable (
	id INT(255) AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(30) NOT NULL,
	val INT(255) NOT NULL
)
```

************************CREATE TABLE** is used called, followed by a name for the table and the arguments that will be used to define the table will be enclosed in **(** and **)**. For each argument, you must give it a name, then the data type and the amount of space that will be allocated for it. 

For more data types, please refer to this [link](https://www.w3schools.com/sql/sql_datatypes.asp).

Other specifiers such as **********AUTO_INCREMENT********** can be used with **PRIMARY KEY** to increment the value by one each time a new entry is added. **PRIMARY KEY** is used to create a unique way to identify rows in a table. It’s required for every table to have a column with this designation.

The below examples are ways to create a table in PHP.

### MySQLi (Objects)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
  echo "Table MyGuests created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
```

### MySQLi (Procedural)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// sql to create table
$sql = "CREATE TABLE MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if (mysqli_query($conn, $sql)) {
  echo "Table MyGuests created successfully";
} else {
  echo "Error creating table: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
```

### PDO

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDBPDO";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // sql to create table
  $sql = "CREATE TABLE MyGuests (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(50),
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )";

  // use exec() because no results are returned
  $conn->exec($sql);
  echo "Table MyGuests created successfully";
} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
```

Just as with creating a database, the statement for creating a table is sent as a string over the connection.

## Inserting Into a Table

The following statement is used to insert values into a table.

```sql
INSERT INTO table_name (column1, column2, column3,...)
VALUES (value1, value2, value3,...)
```

### MySQLi (Objects)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
```

### MySQLi (Procedural)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
```

### PDO

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDBPDO";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "INSERT INTO MyGuests (firstname, lastname, email)
  VALUES ('John', 'Doe', 'john@example.com')";
  // use exec() because no results are returned
  $conn->exec($sql);
  echo "New record created successfully";
} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
```

**INSERT INTO** followed by the name of the table, and then the names of the columns you’re inserting into in parentheses will select the columns. **VALUES** with the values you want to insert in parentheses will insert these values into the selected columns.

## Inserting Multiple Values

The below procedures can be used to insert multiple values at a time into a table. The statements must be separated by a semicolon (**;**).

### MySQLi (Objects)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com');";
$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('Mary', 'Moe', 'mary@example.com');";
$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('Julie', 'Dooley', 'julie@example.com')";

if ($conn->multi_query($sql) === TRUE) {
  echo "New records created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
```

### MySQLi (Procedural)

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com');";
$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('Mary', 'Moe', 'mary@example.com');";
$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('Julie', 'Dooley', 'julie@example.com')";

if (mysqli_multi_query($conn, $sql)) {
  echo "New records created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
```

### PDO

PDO, however, handles this differently.

```php
?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDBPDO";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // begin the transaction
  $conn->beginTransaction();
  // our SQL statements
  $conn->exec("INSERT INTO MyGuests (firstname, lastname, email)
  VALUES ('John', 'Doe', 'john@example.com')");
  $conn->exec("INSERT INTO MyGuests (firstname, lastname, email)
  VALUES ('Mary', 'Moe', 'mary@example.com')");
  $conn->exec("INSERT INTO MyGuests (firstname, lastname, email)
  VALUES ('Julie', 'Dooley', 'julie@example.com')");

  // commit the transaction
  $conn->commit();
  echo "New records created successfully";
} catch(PDOException $e) {
  // roll back the transaction if something failed
  $conn->rollback();
  echo "Error: " . $e->getMessage();
}

$conn = null;
?>
```

## SELECT Statements

From here on out, please refer to previous sections to understand how to send SQL statements across the connection.

Select statements are utilized in order to select certain columns from one or more tables.

```sql
SELECT column_name(s) FROM table_name
```

To select all columns from given table, utilize an asterisk (*****) as shown below.

```sql
SELECT * FROM table_name
```

## Filtering Results

```sql
SELECT column_name(s) FROM table_name WHERE column_name [operator] [value]
```

A **WHERE** statement can be used to filter results so only values that meet certain criteria are retrieved. First, you must specify a column. Then, you must specify a conditional operator such as “**=**” and a value.

```sql
SELECT length FROM dimensions WHERE length = 25
```

The above statement will select values from the ************length************ column with a value **********equal********** to ****25**** and retrieve them. ********

## Ordering Values

```sql
SELECT column_name(s) FROM table_name ORDER BY column_name(s) ASC|DESC
```

An **ORDER BY** statement can be used to order the retrieved columns. By default, columns are ordered in ascending order, however, the **DESC** keyword can be utilized to sort them in descending order.

## Deleting Values

A **DELETE** statement can be used to delete values from a table:

```sql
DELETE FROM table_name
WHERE some_column = some_value
```

## Updating Values

An ************UPDATE************ statement is used to update existing values in a table:

```sql
UPDATE table_name
SET column1=value, column2=value2,...
WHERE some_column=some_value
```

## LIMIT and OFFSET

The following statement can be used to select only a certain number of values starting from a certain row.

```sql
SELECT * FROM Orders LIMIT 10 OFFSET 15
```

**LIMIT 10** will retrieve only **10** values. **OFFSET 15** will ensure retrieval starts at the **16th** record in the table.

# Bibliography

“PHP Tutorial.” *W3Schools Online Web Tutorials*, https://www.w3schools.com/php/default.asp. Accessed 14 Sept. 2023.
