<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* 14. GET LIST OF PEOPLE WHO GOT TEST RESULT ON SPECIFIC DATE */
$data = json_decode(file_get_contents("php://input"));
$change = mysqli_real_escape_string($conn, trim($data->date));

$sql = mysqli_query($conn, "SELECT * FROM Diagnostics D INNER JOIN Person  P ON D.PersonID=P.PersonID
WHERE D.`Result Date` = '$change' ORDER BY D.`Test Result` DESC");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
  $storeArray[$inc][0] = $row["TestID"];
  $storeArray[$inc][1] = $row["PersonID"];
  $storeArray[$inc][2] = $row["Test Result"];
  $storeArray[$inc][3] = $row["FirstName"];
  $storeArray[$inc][4] = $row["LastName"];
  $storeArray[$inc][5] = $row["DoB"];
  $storeArray[$inc][6] = $row["Telephone Number"];
  $storeArray[$inc][7] = $row["Email Address"];
  $inc++;
}
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>