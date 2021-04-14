<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* ALL PUBLIC HEALTH RECOMMENDATIONS ID'S */
$sql = mysqli_query($conn, "SELECT * FROM PublicHealthInstruction");
$storeArray = array();

while ($row = mysqli_fetch_array($sql)) {
    $storeArray[] = $row["InformationID"];
  }
  echo json_encode($storeArray, JSON_PRETTY_PRINT);
  $conn->close();
?>