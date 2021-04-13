<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* 11. ALL PEOPLE SPECIFIC ADDRESS */
$data = json_decode(file_get_contents("php://input"));
$address = mysqli_real_escape_string($conn, trim($data->address));
$sql = mysqli_query($conn, "SELECT * FROM Person WHERE Address = '$address'");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
    $storeArray[$inc][0] = $row["PersonID"];
    $storeArray[$inc][1] = $row["FirstName"];
    $storeArray[$inc][2] = $row["LastName"];
    $storeArray[$inc][3] = $row["DoB"];
    $storeArray[$inc][4] = $row["MedicareNum"];
    $storeArray[$inc][5] = $row["Address"];
    $storeArray[$inc][6] = $row["City"];
    $storeArray[$inc][7] = $row["Province"];
    $storeArray[$inc][8] = $row["Telephone Number"];
    $storeArray[$inc][9] = $row["Postal Code"];
    $storeArray[$inc][10] = $row["Email Address"];
    $storeArray[$inc][11] = $row["Citizenship"];
    $inc++;
};
echo json_encode($storeArray , JSON_PRETTY_PRINT);
$conn->close();
?>