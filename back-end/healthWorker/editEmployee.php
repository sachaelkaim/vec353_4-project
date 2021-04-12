<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* EDIT PUBLIC HEALTH WORKER */
$data = json_decode(file_get_contents("php://input"));
$EmployeeID = mysqli_real_escape_string($conn, trim($data->editEmployeeID));
$column = mysqli_real_escape_string($conn, trim($data->editColumn));
$change = mysqli_real_escape_string($conn, trim($data->editChange));
if($column === "Schedule"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthWorker SET $column = '$change' WHERE EmployeeID = $EmployeeID");
}
if($column == "Facility"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthWorker SET $column = $change WHERE EmployeeID = $EmployeeID");
}
if($column == "PersonID"){
    $sql = mysqli_query($conn, "UPDATE PublicHealthWorker SET $column = $change WHERE EmployeeID = $EmployeeID");
}
echo("Error description: " . mysqli_error($conn));
$conn->close();
?>