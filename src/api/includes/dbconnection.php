<?php

class DBConnection
{
	private $debug = false;
	private $connection = null;
	
	public function __construct()
	{}
	
	public function __destruct()
	{
		$this->close();
	}	
	

	public function connect($host,$user,$password,$db)
	{
		$this->connection = mysqli_connect($host,$user,$password,$db) or die(mysqli_error());;

		if(!$this->connection)
		{
			die("FKMP: Keine Verbindung moeglich: " . mysqli_connect_error());
		}
		else 
		{
			if($this->debug) echo "<p>DB connection successful!</p>";	
		}
	}

	public function query($statement)
	{
		$result = null;

		if(!$this->connection)
		{
			die("FKMP: Keine DB-Verbindung gefunden: " . mysqli_error());
		}
		else 
		{
			$result = mysqli_query($this->connection, $statement);

			//mysqli_free_result($result);

			//$this->close();
		}
		return $result;
	}
	
	public function close()
	{
		if($this->connection) 
		{	
			mysqli_close($this->connection);
			$this->connection = false;
		}
	}

	public function lastInsertedId()
	{
		return mysqli_insert_id($this->connection);
	}
}
?>