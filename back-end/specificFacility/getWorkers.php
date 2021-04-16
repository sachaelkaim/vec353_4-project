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
$sql = mysqli_query($conn, "SELECT * FROM PublicHealthWorker W INNER JOIN Person P ON W.PersonID=P.PersonID WHERE W.Facility = $data");
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
    $storeArray[$inc][0] = $row["EmployeeID"];
    $storeArray[$inc][1] = $row["PersonID"];
    $storeArray[$inc][2] = $row["Schedule"];
    $storeArray[$inc][3] = $row["FirstName"];
    $storeArray[$inc][4] = $row["LastName"];  
    $inc++;
  }
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>