<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
/*
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/

require_once "../includes/config.php";
require_once "../includes/dbconnection.php";
require_once "../objects/band.php";

$debug = false;

if($debug) 
{
	echo "HTTP Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
}

if($_SERVER['REQUEST_METHOD'] == "POST")
{
	// read joomla db access data
	$CONFIG = new FKMPConfig();
	
	// establish db connection
	$dbconnection = new DBConnection();
    $dbconnection->connect($CONFIG->host,$CONFIG->user,$CONFIG->password,$CONFIG->db);
    
    // create band    
    $band = new Band($dbconnection);
    
    // get posted data
    $postdata = json_decode(file_get_contents("php://input"));

    $band->fkmp_band_title = $postdata->title;
    $band->fkmp_band_phone = "";
    $band->fkmp_band_email = "";
    $band->fkmp_band_city = $postdata->city;
    $band->fkmp_band_street = "";
    $band->fkmp_band_zip = "";
    $band->fkmp_band_cntct_fname = "";
    $band->fkmp_band_cntct_lname = "";

    // create the band
    if($band->create())
    {
    
        response(201,"Band created",$dbconnection->lastInsertedId());
    }
    else
    {
        response(200,"Band could not be created",NULL);
    }
}

function response($status,$status_message,$data)
{
	header("HTTP/1.1 ".$status);

	$response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;

	$json_response = json_encode($response);
	echo $json_response;
}
?>