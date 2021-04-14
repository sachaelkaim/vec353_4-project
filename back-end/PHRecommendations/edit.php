<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* EDIT PUBLIC HEALTH RECOMMENDATION */
$data = json_decode(file_get_contents("php://input"));
$InformationID = mysqli_real_escape_string($conn, trim($data->editInformationID));
$change = mysqli_real_escape_string($conn, trim($data->editChange));

$sql = mysqli_query($conn, "UPDATE PublicHealthInstruction SET `Instruction` = '$change' WHERE InformationID = $InformationID");

echo("Error description: " . mysqli_error($conn));
$conn->close();
?>