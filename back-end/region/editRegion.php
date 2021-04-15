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
if($column == "Alert"){
    $sql1 = mysqli_query($conn, "SELECT Alert FROM Region WHERE RegionID = $RegionID");
    $result = mysqli_fetch_assoc($sql1);
    $resultstring = $result['Alert'];
    $sql2 = number_format($resultstring);
    $change1 = number_format($change);
    if($change1 == ($sql2+1) || $change1  == ($sql2-1)){
        $sql = mysqli_query($conn, "UPDATE Region SET $column = '$change' WHERE RegionID = $RegionID");
        echo json_encode("Alert successfully updated", JSON_PRETTY_PRINT);
    }
    else
    echo json_encode("Can only increment or decrement Alert by 1", JSON_PRETTY_PRINT);
}
$conn->close();
?>