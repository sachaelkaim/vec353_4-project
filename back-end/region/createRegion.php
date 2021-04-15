<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* CREATE PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));

$regionName = mysqli_real_escape_string($conn, trim($data->regionName));
$alert = mysqli_real_escape_string($conn, trim($data->alert));

$sql = mysqli_query($conn, "INSERT INTO Region (`Region Name`, `Alert`)
VALUES ('$regionName', '$alert') ");
echo("Error description: " . mysqli_error($conn));

$conn->close();
?>