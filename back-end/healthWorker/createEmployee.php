<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* CREATE PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));

$schedule = mysqli_real_escape_string($conn, trim($data->schedule));
$facility = mysqli_real_escape_string($conn, trim($data->facility));
$personID = mysqli_real_escape_string($conn, trim($data->personID));

$sql = mysqli_query($conn, "INSERT INTO PublicHealthWorker (`Schedule`, `Facility`, `PersonID`)
VALUES ('$schedule', $facility, $personID) ");
echo("Error description: " . mysqli_error($conn));

$conn->close();
?>