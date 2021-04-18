<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* 16.  */
$data = json_decode(file_get_contents("php://input"));
$facilityID = mysqli_real_escape_string($conn, trim($data->data1));
$date2 = mysqli_real_escape_string($conn, trim($data->data2));

$sql = mysqli_query($conn, "SELECT * FROM vec353_4.Diagnostics inner join PublicHealthWorker ON `PublicHealthWorker`.PersonID=`Diagnostics`.PersonID  WHERE `Diagnostics`.FacilityID=$facilityID AND `Diagnostics`.`Result Date`='$date2'");
$storeArray = array();
$storeArray1 = array();
$storeArray2 = array();
$inc = 0;
$inc1 = 0;
while ($row = mysqli_fetch_array($sql)) {
    $storeArray[$inc][0] = $row["TestID"];
    $storeArray[$inc][1] = $row["Result Date"];
    $storeArray[$inc][2] = $row["Date"];
    $storeArray[$inc][3] = $row["EmployeeID"];
    $storeArray[$inc][4] = $row["PersonID"];
    $storeArray[$inc][5] = $row["Facility"];
    $storeArray[$inc][6] = $row["Test Result"];
    $eID = $row["EmployeeID"];
    $sql1 = mysqli_query($conn, "SELECT * FROM vec353_4.PublicHealthWorker WHERE PublicHealthWorker.Facility=(SELECT FACILITY FROM PublicHealthWorker WHERE EmployeeID=$eID)");
    while ($row = mysqli_fetch_array($sql1)) {
        $storeArray1[$inc1][0] = $row["EmployeeID"];
        $storeArray1[$inc1][1] = $row["Schedule"];
        $storeArray1[$inc1][2] = $row["Facility"];
        $storeArray1[$inc1][3] = $row["PersonID"];
        $inc1++;
    }
    $inc++;
  }
$storeArray2['positives'] = $storeArray;
$storeArray2['employees'] = $storeArray1;
echo json_encode($storeArray2, JSON_PRETTY_PRINT);
$conn->close();
?>