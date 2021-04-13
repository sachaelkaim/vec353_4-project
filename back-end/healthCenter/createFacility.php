<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* CREATE PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));

$type = mysqli_real_escape_string($conn, trim($data->type));
$webAddress = mysqli_real_escape_string($conn, trim($data->webAddress));
$phoneNumber = mysqli_real_escape_string($conn, trim($data->phoneNumber));
$address = mysqli_real_escape_string($conn, trim($data->address));
$name = mysqli_real_escape_string($conn, trim($data->name));
$testingMethod = mysqli_real_escape_string($conn, trim($data->testingMethod));
$driveThruTesting = mysqli_real_escape_string($conn, trim($data->driveThruTesting));

$sql = mysqli_query($conn, "INSERT INTO PublicHealthCenter (`Type`, `Web Address`, `Phone Number`, `Address`, `Name`, `Testing Method`, `Drive Thru Testing`)
VALUES ('$type', '$webAddress', '$phoneNumber', '$address', '$name', '$testingMethod', '$driveThruTesting') ");
echo("Error description: " . mysqli_error($conn));

$conn->close();
?>