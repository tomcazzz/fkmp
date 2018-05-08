<?php

class DBConnection
{
	private $debug = false;
	private $connection;
	private $db;
	private $persistant = false;
	
	public function __construct()
	{}
	
	public function __destruct()
	{
		$this->close();
	}	
	
	// Datenbank + Tabellen anlegen anlegen über .sql-Datei
	public function createDB($dbname,$createfile)
	{
		if (!isset($this->connection)) die("Es existiert noch keine Verbindung zur Datenbank");
		$this->db = mysql_select_db($dbname,$this->connection);
		
		if (!isset($this->db)) // nur anlegen, wenn die Datenbank noch nicht existiert
		{
			// Datenbank + Tabelle anlegen
			$sql = file_get_contents($createfile);
			mysql_query("CREATE DATABASE " . $dbname .";",$this->connection) or die("Die Datenbank konnte nicht angelegt werden");		
			mysql_query("USE " . $dbname,$this->connection);

			// Tabelle anlegen
			if (!mysql_query($sql,$this->connection))
			{
				die("Die Tabelle konnte nicht angelegt werden: " . mysql_error());
			}				
		}
	}
	
	// Datenbanktabellen über .sql-Datei füllen
	public function populateDB($dbname,$insertfile,$tablename="",$insertifempty=false)
	{
		if (!isset($this->connection)) die("Es existiert noch keine Verbindung zur Datenbank");
		
		$this->db = mysql_select_db($dbname,$this->connection);

		// Prüfen, ob DB vorhanden ist
		if (!$this->db)
		{
			die("Die Datenbank " . $dbname . " ist nicht vorhanden!");
		}

		// Tabellen mit Daten füttern
		if(isset($tablename) && $insertifempty) // -> Daten nur einfügen, wenn die Tabelle noch leer ist
		{
			$result = $this->query("select count(*) from " . $tablename,$this->connection);
			if (mysql_num_rows($result) > 0) exit();			
		}
		$sql = file_get_contents($insertfile);
		if (!$this->query($sql,$this->connection)) die("Die Daten konnten nicht in die Datenbank verbracht werden");		
	}

	public function connect($host,$dbname,$user,$pass,$persistant=false)
	{				
		$this->persistant = $persistant;
		
		if ($this->persistant) $this->connection = mysql_pconnect($host,$user,$pass);
		else $this->connection = mysql_connect($host,$user,$pass);
		
		if ($this->connection) 
		{
			$this->db = mysql_select_db($dbname,$this->connection);
			$this->query("set names 'utf8';"); // so all data coming from mysql will be utf-8 encoded and German Umlauts are no problem anymore
		}
		else die("Keine Verbindung moeglich: " . mysql_error());
	}
	
	public function query($statement)
	{	
		if (!isset($this->db)) die("Keine Datenbank ausgewählt. " . mysql_error());
		$result = mysql_query($statement,$this->connection);
		if (!$result) die("Ungültige Anfrage: " . mysql_error());
		
		if (!is_bool($result)) // d.h. es hat sich um ein select statement gehandelt (ein insert-statement liefert bei mysql_query true oder false zurück)
		{
			if (mysql_num_rows($result) == 0)
			{
				if($this->debug) echo "Es konnten keine Daten gefunden werden";
			}
		}
		
		return $result;
	}
	
	public function close()
	{
		if ($this->connection) 
		{
		    if ($this->persistant) 
			{
                $this->connection = false;
            }
            else 
			{
                mysql_close($this->connection);
                $this->connection = false;
			}
		}
	}
}
?>