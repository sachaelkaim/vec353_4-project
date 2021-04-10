<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* EDIT PERSON */
$data = json_decode(file_get_contents("php://input"));
$personID = mysqli_real_escape_string($conn, trim($data->editPersonID));
$column = mysqli_real_escape_string($conn, trim($data->editColumn));
$change = mysqli_real_escape_string($conn, trim($data->editChange));
$sql = mysqli_query($conn, "UPDATE Person SET $column = '$change' WHERE PersonID = $personID");
echo json_encode($personID, JSON_PRETTY_PRINT);