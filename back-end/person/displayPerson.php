<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* DISPLAY PERSON */
$data = json_decode(file_get_contents("php://input"));

$sql = mysqli_query($conn, "SELECT * FROM Person WHERE PersonID = $data");
$storeArray = array();

while ($row = mysqli_fetch_array($sql)) {
  $storeArray[] = $row["FirstName"];
  $storeArray[] = $row["LastName"];
  $storeArray[] = $row["DoB"];
  $storeArray[] = $row["MedicareNum"];
  $storeArray[] = $row["Address"];
  $storeArray[] = $row["City"];
  $storeArray[] = $row["Province"];
  $storeArray[] = $row["Telephone Number"];
  $storeArray[] = $row["Postal Code"];
  $storeArray[] = $row["Email Address"];
  $storeArray[] = $row["Citizenship"];
}
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
?>