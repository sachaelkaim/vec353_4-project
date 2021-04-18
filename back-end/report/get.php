<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* 17.  */
$data = json_decode(file_get_contents("php://input"));
$date1 = mysqli_real_escape_string($conn, trim($data->data1));
$date2 = mysqli_real_escape_string($conn, trim($data->data2));

$sql = mysqli_query($conn, "SELECT Region.`Region Name`,
sum(case when Diagnostics.`Test Result` = 'positive' then 1 else 0 end) AS 'Positive',
sum(case when Diagnostics.`Test Result` = 'negative' then 1 else 0 end) AS 'Negative'
FROM Region
JOIN City
ON Region.RegionID = City.RegionID
JOIN PostalCodes
ON City.CityID = PostalCodes.CityID
JOIN Person
ON PostalCodes.PostalCode = Person.`Postal Code` 
JOIN Diagnostics
ON Person.PersonID = Diagnostics.PersonID
WHERE Diagnostics.`Result Date`
BETWEEN '$date1' AND '$date2'
GROUP BY Region.`Region Name`;
");
$storeArray = array();
$inc = 0;
while ($row = mysqli_fetch_array($sql)) {
  $storeArray[$inc][0] = $row["Region Name"];
  $storeArray[$inc][1] = $row["Positive"];
  $storeArray[$inc][2] = $row["Negative"];
  $inc++;
}
echo json_encode($storeArray, JSON_PRETTY_PRINT);
$conn->close();
