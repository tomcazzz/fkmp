<?php
/**
 * Database config variables
 */
 abstract class HelperFunctions
 {
	// send emsil using values stored in config.php
	public static function sendMailToWebMaster($subject,$body)
	{
		$CONFIG = new VivoConfig();
		mail($CONFIG->to, $subject, $body, $CONFIG->header);
	}
}
?>