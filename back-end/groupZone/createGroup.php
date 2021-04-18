<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* CREATE GROUP ZONE*/
$data = json_decode(file_get_contents("php://input"));

$zoneName = mysqli_real_escape_string($conn, trim($data->zoneName));
$zoneAddress = mysqli_real_escape_string($conn, trim($data->zoneAddress));
$zoneDescription = mysqli_real_escape_string($conn, trim($data->zoneDescription));

$sql = mysqli_query($conn, "INSERT INTO GroupZone (`Zone Name`, `Zone Address`, `Zone Description`)
VALUES ('$zoneName', '$zoneAddress', '$zoneDescription') ");
echo("Error description: " . mysqli_error($conn));

$conn->close();
?>