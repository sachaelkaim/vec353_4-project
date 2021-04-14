<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* EDIT PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));
$FacilityID = mysqli_real_escape_string($conn, trim($data->editFacilityID));
$column = mysqli_real_escape_string($conn, trim($data->editColumn));
$change = mysqli_real_escape_string($conn, trim($data->editChange));
if($column === "Type"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthCenter SET $column = '$change' WHERE FacilityID = $FacilityID");
}
if($column == "Web Address"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthCenter SET $column = '$change' WHERE FacilityID = $FacilityID");
}
if($column == "Phone Number"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthCenter SET $column = '$change' WHERE FacilityID = $FacilityID");
}
if($column == "Address"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthCenter SET $column = '$change' WHERE FacilityID = $FacilityID");
}
if($column == "Name"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthCenter SET $column = '$change' WHERE FacilityID = $FacilityID");
}
if($column == "Testing Method"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthCenter SET $column = '$change' WHERE FacilityID = $FacilityID");
}
if($column == "Drive Thru Testing"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthCenter SET $column = '$change' WHERE FacilityID = $FacilityID");
}
echo("Error description: " . mysqli_error($conn));
$conn->close();
?>