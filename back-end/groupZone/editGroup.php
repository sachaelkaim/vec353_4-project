<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* EDIT PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));
$GroupID = mysqli_real_escape_string($conn, trim($data->editGroupID));
$column = mysqli_real_escape_string($conn, trim($data->editColumn));
$change = mysqli_real_escape_string($conn, trim($data->editChange));
if($column === "Zone Name"){
    $sql = mysqli_query($conn, "UPDATE GroupZone SET $column = '$change' WHERE GroupID = $GroupID");
}
if($column == "Zone Address"){
    $sql = mysqli_query($conn, "UPDATE GroupZone SET $column = '$change' WHERE GroupID = $GroupID");
}
if($column == "Zone Description"){
    $sql = mysqli_query($conn, "UPDATE GroupZone SET $column = '$change' WHERE GroupID = $GroupID");
}
echo("Error description: " . mysqli_error($conn));
$conn->close();
?>