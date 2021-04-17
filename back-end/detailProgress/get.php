<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* 9. DETAIL PROGRESS FOR THOSE TESTING POSITIVE ON SPECIFIC DAY */
$data = json_decode(file_get_contents("php://input"));
$date1 = mysqli_real_escape_string($conn, trim($data->date1));

$sql = mysqli_query($conn, "SELECT * FROM vec353_4.SymptomFollowUp INNER JOIN `Diagnostics` ON `SymptomFollowUp`.`TestID`=`Diagnostics`.`TestID` WHERE `Diagnostics`.`Result Date`='$date1'");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
    $storeArray[$inc][] = $row["TestID"];
    $storeArray[$inc][] = $row["Time"];
    $storeArray[$inc][] = $row["Date"];
    $storeArray[$inc][] = $row["Temperature"];
    $storeArray[$inc][] = $row["Symptoms"];
    $inc++;
  }
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>