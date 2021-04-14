<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* GET ALL WORKERS AT A FACILITY */
$data = json_decode(file_get_contents("php://input"));
$storeArray = array();
$inc = 0;
$sql = mysqli_query($conn, "SELECT * FROM PublicHealthWorker WHERE Facility = $data");
while ($row = mysqli_fetch_array($sql)) {
    $personID = $row["PersonID"];
    $storeArray[$inc][0] = $row["EmployeeID"];
    $storeArray[$inc][1] = $row["PersonID"];
    $storeArray[$inc][2] = $row["Schedule"];
    $sql1 = mysqli_query($conn, "SELECT * FROM Person WHERE PersonID = $personID");
    while ($row1 = mysqli_fetch_array($sql1)) {
      $storeArray[$inc][3] = $row1["FirstName"];
      $storeArray[$inc][4] = $row1["LastName"];
    }
    $inc++;
  }
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>