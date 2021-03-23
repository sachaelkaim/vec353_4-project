<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//servername * 'vec353.encs.concordia.ca' for server , 'localhost' for local machine with ssh tunnel and apache
$servername = "vec353.encs.concordia.ca";
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


$storeArray = Array();



   $sql = mysqli_query($conn, "SELECT * FROM Person");
   while($row = mysqli_fetch_array($sql)) {
    $storeArray[] = $row['FirstName'];
   }
   echo json_encode($storeArray, JSON_PRETTY_PRINT);

?>