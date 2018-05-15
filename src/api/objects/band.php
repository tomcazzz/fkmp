<?php
class Band{
 
    // database connection and table name
    private $connection;
    private $table_name = "fkmp_band";
 
    // object properties
    public $fkmp_band_id;
    public $fkmp_band_title;
    public $fkmp_band_phone;
    public $fkmp_band_email;
    public $fkmp_band_city;
    public $fkmp_band_street;
    public $fkmp_band_zip;
    public $fkmp_band_cntct_fname;
    public $fkmp_band_cntct_lname;
 
    // constructor with $db as database connection
    public function __construct($dbc){
        $this->connection = $dbc;
    }

    // create new band record set
    public function create(){
        $debug = false;

        $this->fkmp_band_title=htmlspecialchars(strip_tags($this->fkmp_band_title));
        $this->fkmp_band_phone=htmlspecialchars(strip_tags($this->fkmp_band_phone));
        $this->fkmp_band_email=htmlspecialchars(strip_tags($this->fkmp_band_email));
        $this->fkmp_band_city=htmlspecialchars(strip_tags($this->fkmp_band_city));
        $this->fkmp_band_street=htmlspecialchars(strip_tags($this->fkmp_band_street));
        $this->fkmp_band_zip=htmlspecialchars(strip_tags($this->fkmp_band_zip));
        $this->fkmp_band_cntct_fname=htmlspecialchars(strip_tags($this->fkmp_band_cntct_fname));
        $this->fkmp_band_cntct_lname=htmlspecialchars(strip_tags($this->fkmp_band_cntct_lname));

        $sQuery = 	"insert into ".$this->table_name." (
            fkmp_band_title,
            fkmp_band_phone,
            fkmp_band_email,
            fkmp_band_city,
            fkmp_band_street,
            fkmp_band_zip,
            fkmp_band_cntct_fname,
            fkmp_band_cntct_lname
        ) 
        values(
            '".$this->fkmp_band_title."',
            '".$this->fkmp_band_phone."',
            '".$this->fkmp_band_email."',
            '".$this->fkmp_band_city."',
            '".$this->fkmp_band_street."',
            '".$this->fkmp_band_zip."',
            '".$this->fkmp_band_cntct_fname."',
            '".$this->fkmp_band_cntct_lname."'	
        );"; 

        if($debug) echo $sQuery;

        $result = $this->connection->query($sQuery) or die (mysqli_error($this->connection));

        return $result; 
    }
}