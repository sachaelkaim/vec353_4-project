<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* 10. ALL MESSAGES WITHIN A SPECIFIC PERIOD OF TIME */
$data = json_decode(file_get_contents("php://input"));
$date1 = mysqli_real_escape_string($conn, trim($data->date1));
$date2 = mysqli_real_escape_string($conn, trim($data->date2));

$sql = mysqli_query($conn, "SELECT * FROM `Messages` WHERE `Messages`.`Date` BETWEEN '$date1' AND '$date2';");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
    $storeArray[$inc][] = $row["MessageID"];
    $storeArray[$inc][] = $row["Date"];
    $storeArray[$inc][] = $row["Time"];
    $storeArray[$inc][] = $row["PersonID"];
    $storeArray[$inc][] = $row["Email"];
    $storeArray[$inc][] = $row["Message"];
    $storeArray[$inc][] = $row["New Alert"];
    $storeArray[$inc][] = $row["Old Alert"];
    $inc++;
  }
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>