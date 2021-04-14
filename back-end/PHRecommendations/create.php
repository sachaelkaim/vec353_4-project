<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* CREATE A RECOMMENDATION */
$data = json_decode(file_get_contents("php://input"));

$instruction = mysqli_real_escape_string($conn, trim($data->instruction));

$sql = mysqli_query($conn, "INSERT INTO PublicHealthInstruction (`instruction`)
VALUES ('$instruction') ");
echo("Error description: " . mysqli_error($conn));

$conn->close();
?>