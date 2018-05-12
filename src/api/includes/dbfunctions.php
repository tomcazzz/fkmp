<?php
 
class DBFunctions 
{
    var $db;
 
    // constructor
    function __construct() 
	{
        require_once 'dbconnection.php';

		// get database credentials	
		$CONFIG = new FKMPConfig();
		
		// establish db connection
		$this->db = new DBConnection();
		$this->db->connect($CONFIG->host,$CONFIG->db,$CONFIG->user,$CONFIG->password);
    }
 
    // destructor
    function __destruct() 
	{
		$this->db->close();     
    }
 
    /**
     * Storing new user
     * returns user details
     */
    public function storeUser($name, $email, $password) 
	{
        $uuid = uniqid('', true);
        $hash = $this->hashSSHA($password);
        $encrypted_password = $hash["encrypted"]; // encrypted password
        $salt = $hash["salt"]; // salt
        $result = $this->db->query("INSERT INTO users(unique_id, name, email, encrypted_password, salt, created_at) VALUES('$uuid', '$name', '$email', '$encrypted_password', '$salt', NOW())");
        // check for successful store
        if ($result) 
		{
            // get user details
            $uid = mysql_insert_id(); // last inserted id
            $result = $this->db->query("SELECT * FROM users WHERE uid = $uid");
            // return user details
            return mysql_fetch_array($result);
        } 
		else 
		{
            return false;
        }
    }
 
    /**
     * Get user by email and password
     */
    public function getUserByEmailAndPassword($email, $password) 
	{
        $result = $this->db->query("SELECT * FROM users WHERE email = '$email'") or die(mysql_error());
		
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) 
		{
            $result = mysql_fetch_array($result);
            $salt = $result['salt'];
            $encrypted_password = $result['encrypted_password'];
            $hash = $this->checkhashSSHA($salt, $password);
            // check for password equality
            if ($encrypted_password == $hash) 
			{
                // user authentication details are correct
                return $result;
            }
        } 
		else 
		{
            // user not found
            return false;
        }
    }
 
    /**
     * Check whether user already exists
     */
    public function userAlreadyExists($email) 
	{
        $result = $this->db->query("SELECT email from users WHERE email = '" . $email . "'");
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) 
		{
            // user exists
            return true;
        } 
		else 
		{
            // user doesn't exist
            return false;
        }
    }
 
    /**
     * Encrypting password
     * @param password
     * returns salt and encrypted password
     */
    public function hashSSHA($password) 
	{
        $salt = sha1(rand());
        $salt = substr($salt, 0, 10);
        $encrypted = base64_encode(sha1($password . $salt, true) . $salt);
        $hash = array("salt" => $salt, "encrypted" => $encrypted);
        return $hash;
    }
 
    /**
     * Decrypting password
     * @param salt, password
     * returns hash string
     */
    public function checkhashSSHA($salt, $password) 
	{
 
        $hash = base64_encode(sha1($password . $salt, true) . $salt);
 
        return $hash;
    }
}
 
?>