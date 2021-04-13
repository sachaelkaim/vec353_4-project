<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* 12. DISPLAY ALL FACILITIES AND WORKERS IN EACH FACILITY*/

$sql = mysqli_query($conn, "SELECT * FROM PublicHealthCenter");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
  $storeArray1 = array();
  $facility = $row["FacilityID"];
  $storeArray[$inc][0] = $row["FacilityID"];
  $storeArray[$inc][1] = $row["Type"];
  $storeArray[$inc][2] = $row["Web Address"];
  $storeArray[$inc][3] = $row["Phone Number"];
  $storeArray[$inc][4] = $row["Address"];
  $storeArray[$inc][5] = $row["Name"];
  $storeArray[$inc][6] = $row["Testing Method"];
  $storeArray[$inc][7] = $row["Drive Thru Testing"];
  $sql1 = mysqli_query($conn, "SELECT Facility FROM PublicHealthWorker WHERE Facility = $facility");
  while ($row1 = mysqli_fetch_array($sql1)) {
    $storeArray1[] = $row1["Facility"];
  }
  $storeArray[$inc][8] = count($storeArray1);
  $inc++;
}
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>