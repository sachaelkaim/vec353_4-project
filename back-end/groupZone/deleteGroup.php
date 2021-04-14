<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

/* DELETE PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));
$sql = mysqli_query($conn, "DELETE FROM GroupZone WHERE ZoneID = $data");
echo("Error description: " . mysqli_error($conn));
$conn->close();
?>