<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* DISPLAY PERSON */
$data = json_decode(file_get_contents("php://input"));

$sql = mysqli_query($conn, "SELECT * FROM Region WHERE RegionID = $data");
$storeArray = array();

while ($row = mysqli_fetch_array($sql)) {
  $storeArray[] = $row["Region Name"];
  $storeArray[] = $row["Cities"];
  $storeArray[] = $row["Postal Codes"];
  $storeArray[] = $row["Alert"];
}
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>