<?php
require_once "./includes/config.php";
require_once "./includes/dbconnection.php";

$debug = false;

if($debug) 
{
	echo "HTTP Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
	echo "Method: " . $_POST['method'];
}


if(isset($_POST['method']) || isset($_GET['method']))
{
	// read joomla db access data
	$CONFIG = new FKMPConfig();
	
	// establish db connection
	$dbconnection = new DBConnection();
	$dbconnection->connect($CONFIG->host,$CONFIG->user,$CONFIG->password,$CONFIG->db);
}

if(isset($_POST['method']) && $dbconnection)
{
	if($debug) echo "method: " . $_POST['method'];

	// addBand
	if ($_POST['method'] == 'addBand')
	{
		if($debug) echo "Method: " . $_POST['method'];
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		@$title = $request->title;
		@$city = $request->city;

		$sQuery = 	"insert into fkmp_band(
						fkmp_band_title,
						fkmp_band_phone,
						fkmp_band_email,
						fkmp_band_city,
						fkmp_band_street,
						fkmp_band_zip,
						fkmp_band_cntct_fname,
						fkmp_band_cnttct_lname
					) 
					values(
						'".@$title."',
						'',
						'',
						'".@city."',
						'',
						'',
						'',
						''	
					);"; 
		
		if($debug) echo $sQuery;
		
		$result = $dbconnection->query($sQuery) or die (mysqli_error($dbconnection));

		if($debug) echo $result;

		if($result)
		{
			response(201,"Band created",$dbconnection->lastInsertedId());
		}
		else
		{
			response(200,"Band could not be created",NULL);
		}
	}
	$dbconnection->close();
}
else if (isset($_GET['method']) && $dbconnection)
{	
	// getBands
	if ($_GET['method'] == 'getBands')
	{
		if($debug) echo "<p>Method: " . $_GET['method'] ."</p>";
		if (isset($_GET['param']))
		{
			$sQuery = "select 
			fkmp_band_id as id,
			fkmp_band_title as title
			from fkmp_band";
			
			$sOrderBy = "order by title asc";
			
			if($debug) echo "<p>Param: " . $_GET['param'] ."</p>";
			
			switch($_GET['param'])
			{				
				case 'all':
					$sWhere = "";		
					break;
				case 'single':
					if (isset($_GET['id']))
					{
						$sWhere = "where fkmp_band_id = '".$_GET['id']."'";
					}

					break;
				default: 
					$sWhere = "";		
			}
			if($debug) 
				echo "<p>".$sQuery . ' ' . $sWhere . ' ' . $sOrderBy."</p>";

			$result = $dbconnection->query($sQuery . ' ' . $sWhere . ' ' . $sOrderBy);
		}
		else die('Error: Please provide param for method getBands');
	}
	
	
	if (isset($result) && $_SERVER['REQUEST_METHOD'] == 'GET')
	{
		if($debug)
			echo "result is set<br><br>";

		// return json format
		$items = array();
		
		if(mysqli_num_rows($result)) 
		{
			if(mysqli_num_rows($result) == 1) // Object
			{
				$item = mysqli_fetch_assoc($result);
				$json = json_encode($item);	
			}
			else // Array
			{
				while($item = mysqli_fetch_assoc($result)) 
				{
					/*
					if($debug) {
						echo "ID: " . $item["id"]. "<br>";
						echo "Title: " . $item["title"]. "<br>";
					}
					*/

					$items[] = $item;
					
				}
				$json = json_encode($items);
			}
		}
		else die('Error: no data found for query');
		
 		//header('Content-type: application/json');	
		echo $json;		
	}

	$dbconnection->close();
}

function response($status,$status_message,$data)
{
	header("HTTP/1.1 ".$status);

	$response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;

	$json_response = json_encode($resonse);
	echo $json_response;
}

?>
