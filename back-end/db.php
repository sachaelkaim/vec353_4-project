<?php
//servername * 'vec353.encs.concordia.ca' for server , 'localhost' for local machine with ssh tunnel and apache
$servername = "localhost";
$username = "vec353_4";
$password = "Data353b";
$dbname = "vec353_4";
$port = 3306;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>