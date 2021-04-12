<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';
/* CREATE PERSON */
$data = json_decode(file_get_contents("php://input"));

$firstName = mysqli_real_escape_string($conn, trim($data->firstName));
$lastName = mysqli_real_escape_string($conn, trim($data->lastName));
$dob = mysqli_real_escape_string($conn, trim($data->dob));
$medicNumber = mysqli_real_escape_string($conn, trim($data->medicNumber));
$address = mysqli_real_escape_string($conn, trim($data->address));
$city = mysqli_real_escape_string($conn, trim($data->city));
$province = mysqli_real_escape_string($conn, trim($data->province));
$telNumber = mysqli_real_escape_string($conn, trim($data->telNumber));
$postalCode = mysqli_real_escape_string($conn, trim($data->postalCode));
$email = mysqli_real_escape_string($conn, trim($data->email));
$citizenship = mysqli_real_escape_string($conn, trim($data->citizenship));

$sql = mysqli_query($conn, "INSERT INTO Person (`FirstName`, `LastName`, `DoB`, `MedicareNum`, `Address`, `City`,`Province`,`Telephone Number`, `Postal Code`, `Email Address`, `Citizenship`)
VALUES ('$firstName', '$lastName', '$dob', '$medicNumber', '$address', '$city', '$province', '$telNumber', '$postalCode', '$email', '$citizenship') ");
echo("Error description: " . mysqli_error($conn));

$conn->close();
?>