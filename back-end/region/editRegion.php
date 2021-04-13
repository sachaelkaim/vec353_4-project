<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* EDIT PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));
$RegionID = mysqli_real_escape_string($conn, trim($data->editRegionID));
$column = mysqli_real_escape_string($conn, trim($data->editColumn));
$change = mysqli_real_escape_string($conn, trim($data->editChange));
if($column === "Region Name"){
    $sql = mysqli_query($conn, "UPDATE Region SET $column = '$change' WHERE RegionID = $RegionID");
}
if($column == "Cities"){
    $sql = mysqli_query($conn, "UPDATE Region SET $column = $change WHERE RegionID = $RegionID");
}
if($column == "Postal Code"){
    $sql = mysqli_query($conn, "UPDATE Region SET $column = $change WHERE RegionID = $RegionID");
}
if($column == "Alert"){
    $sql = mysqli_query($conn, "UPDATE Region SET $column = $change WHERE RegionID = $RegionID");
}

echo("Error description: " . mysqli_error($conn));
$conn->close();
?>