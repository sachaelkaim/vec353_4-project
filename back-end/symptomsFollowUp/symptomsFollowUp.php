<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db.php';

$data = json_decode(file_get_contents("php://input"));

//used for authentication
$medicNumber = mysqli_real_escape_string($conn, trim($data->medicNumber));
$dob = mysqli_real_escape_string($conn, trim($data->dob)); //DDMMYYYY
$oldDate = explode('-', $dob);
$formatedDate = $oldDate[2].'-'.$oldDate[1].'-'.$oldDate[0]; 

//used to insert into symptom follow up form
$date = mysqli_real_escape_string($conn, trim($data->date));
$time = mysqli_real_escape_string($conn, trim($data->time));
$temperature = mysqli_real_escape_string($conn, trim($data->temperature));
$symptoms = mysqli_real_escape_string($conn, trim($data->symptoms));

//authenticate
$auth = mysqli_query($conn, "SELECT PersonID FROM Person WHERE MedicareNum = '$medicNumber' AND DoB = '$formatedDate'");
$authArr = array();  //position 0 -> PersonID
while($row = mysqli_fetch_array($auth)){
    $authArr[] = $row["PersonID"];
}
$arrCount = count($authArr);
$diaArr = array();


// if authentication passes
if($arrCount == 1){
    $personID = $authArr[0];
    $sqlAllDiagnostic = mysqli_query($conn, "SELECT * FROM Diagnostics WHERE PersonID = $personID");
    $inc = 0;
    while($row = mysqli_fetch_array($sqlAllDiagnostic)){
        $diaArr[$inc][] = $row["TestID"];
        $diaArr[$inc][] = $row["Result Date"];
        $diaArr[$inc][] = $row["Test Result"];
        $inc++;
    }
    if($inc == 0){
        echo json_encode("No Test Entry", JSON_PRETTY_PRINT);
    }
    else{
        if($diaArr[$inc-1][2] == "positive" || $diaArr[$inc-1][2] == "Positive"){
            $resultDate = $diaArr[$inc-1][1];
            $date1 = new DateTime($date);
            $date2 = new DateTime($resultDate);
            $interval = $date1->diff($date2);
            if($interval->days > 14 || $interval->days == 0 || $date1 < $date2){
                echo json_encode("Invalid follow up date", JSON_PRETTY_PRINT);
            }else {
                $testID = $diaArr[$inc-1][0];
                $sqlSymptoms = mysqli_query($conn, "SELECT `Date` FROM SymptomFollowUp WHERE TestID = $testID");
                $followUpDates = array();
                while($row = mysqli_fetch_array($sqlSymptoms)){
                    $followUpDates[] = $row["Date"];
                }
                $badDate = false;
                foreach ($followUpDates as &$value) {
                    if($value == $date){
                        echo json_encode("Report for that date already exists", JSON_PRETTY_PRINT);
                        $badDate = true;
                    }
                }
                if($badDate == false){
                    $sql = mysqli_query($conn, "INSERT INTO SymptomFollowUp (`Date`, `Time`, `Temperature`,`Symptoms`,`TestId`) VALUES ('$date', '$time', '$temperature', '$symptoms', $testID) ");
                    echo json_encode("Successfully added the report", JSON_PRETTY_PRINT);
                }
            }
        }else {
            echo json_encode("No Test Entry", JSON_PRETTY_PRINT);
        }
    }
}
else{
    echo json_encode("Wrong Password", JSON_PRETTY_PRINT);;
}

$conn->close();


?>