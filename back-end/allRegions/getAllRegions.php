<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* 13. GET ALL REGION INFORMATION*/

$sql = mysqli_query($conn, "SELECT * FROM Region");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
  $regionID = $row["RegionID"];
  $storeArray[$inc][] = $row["Region Name"];
  $sql1 = mysqli_query($conn, "SELECT * FROM City WHERE RegionID = $regionID");
  while ($row1 = mysqli_fetch_array($sql1)) {
    $cityID = $row1["CityID"];
    $storeArray[$inc][] = $row1["CityName"];
    $sql2 = mysqli_query($conn, "SELECT * FROM PostalCodes WHERE CityID = $cityID");
    while ($row1 = mysqli_fetch_array($sql2)) {
        $storeArray[$inc][] = $row1["PostalCode"];
    }
  }
  $inc++;
}
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>