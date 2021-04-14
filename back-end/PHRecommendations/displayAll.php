<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* 12. DISPLAY ALL PUBLIC HEALTH RECOMMENDATIONS*/

$sql = mysqli_query($conn, "SELECT * FROM PublicHealthInstruction");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
  $storeArray[$inc][0] = $row["InformationID"];
  $storeArray[$inc][1] = $row["Instruction"];
  $inc++;
}
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>