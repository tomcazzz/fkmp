<?php
require_once "./includes/config.php";
require_once "./includes/dbconnection.php";

$debug = false;

if (isset($_GET['method']))
{
	// read joomla db access data
	$CONFIG = new FKMPConfig();
	
	// establish db connection
	$dbconnection = new DBConnection();
	$dbconnection->connect($CONFIG->host,$CONFIG->user,$CONFIG->password,$CONFIG->db);
	
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
			
			$sOrderBy = "order by id asc";
			
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
	/*
	// getGigs
	if ($_GET['method'] == 'getGigs')
	{
		if (isset($_GET['param']))
		{
			$sQuery = "select 
			jos_eventlist_events.title as gig_name, 
			jos_eventlist_events.dates as gig_date,
			subtime(jos_eventlist_events.times, '01:45:00.000000') as gig_admittance,
			jos_eventlist_events.times as gig_begin, 
			jos_eventlist_venues.city as gig_location, 
			jos_eventlist_events.datdescription as gig_comment, 
			concat(jos_eventlist_venues.plz,' ',jos_eventlist_venues.city,' ',jos_eventlist_venues.street) as gig_address,
			if(jos_eventlist_events.published = 1,0,1) as gig_archived,
			jos_eventlist_events.created as gig_created, 	
			jos_eventlist_events.modified as gig_modified 
			from jos_eventlist_events 
			join jos_eventlist_venues on jos_eventlist_venues.id = jos_eventlist_events.locid";
			
			$sOrderBy = "order by jos_eventlist_events.created desc";
			
			if($debug) echo "<p>Param: " . $_GET['param'] ."</p>";
			
			switch($_GET['param'])
			{				
				case 'new':
					$sWhere = "where jos_eventlist_events.catsid = 1 and jos_eventlist_events.published = 1";		
					break;
				case 'archived':
					$sWhere = "where jos_eventlist_events.catsid = 1 and jos_eventlist_events.published = -1";		
					break;
				case 'all':
					$sWhere = "where jos_eventlist_events.catsid = 1";		
					break;					
				default: // parameter contains date which stands for max created date
					$sWhere = "where jos_eventlist_events.catsid = 1 and jos_eventlist_events.published = 1 and jos_eventlist_events.created > " . $_GET['param'];		
			}
			$result = $dbconnection->query($sQuery . ' ' . $sWhere . ' ' . $sOrderBy);
		}
		else die('Error: Please provide param for method getGigs');
	}
	
	// getNews
	else if($_GET['method'] == 'getNews')
	{
		if (isset($_GET['param']))
		{
			// Hint: select fulltext from... is not allowed because fulltext is a mysql key word. Only `fulltext` (use these apostrophes!)
			$sQuery = "select 
			IF(`fulltext` = '', jos_content.introtext, concat(jos_content.introtext,`fulltext`)) as news_text, 
			jos_content.title as news_title, 
			jos_content.created as news_created,
			if(jos_content.state = 1,0,1) as news_archived 
			from jos_content 
			join jos_categories on jos_categories.id = jos_content.catid";

			$sOrderBy = "order by jos_content.created desc";
			
			switch($_GET['param'])
			{				
				case 'new':
					$sWhere = "where jos_categories.title = 'News' and jos_content.state = 1";		
					break;
				case 'archived':
					$sWhere = "where jos_categories.title = 'News' and jos_content.state = 2";		
					break;
				case 'all':
					$sWhere = "where jos_categories.title = 'News'";		
					break;	
				default:
					die('Error: Parameter '.$_GET['param'].' not exists');
			}
			$result = $dbconnection->query($sQuery . ' ' . $sWhere . ' ' . $sOrderBy);			
		}
		else die('Error: Please provide param for method getNews');
	}
	
	// getLinks
	if ($_GET['method'] == 'getLinks')
	{
		if (isset($_GET['param']))
		{
			$sQuery = "select 
			jos_weblinks.title as link_name, 
			jos_weblinks.url as link_url, 
			jos_weblinks.description as link_comment, 
			jos_weblinks.created as link_created
			from jos_weblinks ";
			
			switch($_GET['param'])
			{				
				case 'all':
					$sWhere = "where jos_weblinks.archived=0";		
					break;	
				default:
					die('Error: Parameter '.$_GET['param'].' not exists');
			}
			$result = $dbconnection->query($sQuery . ' ' . $sWhere);
		}
		else die('Error: Please provide param for method getLinks');
	}
	
	// getVideos
	if ($_GET['method'] == 'getVideos')
	{
		$sQuery = "select 
		jos_youtubegallery_videolists.videolist as gallery_list
		from jos_youtubegallery_videolists ";
		
		$sWhere = "";		
		$result = $dbconnection->query($sQuery . ' ' . $sWhere);
	}	
	
	// getGalleries
	if ($_GET['method'] == 'getGalleries')
	{
		$sQuery = "select
		jos_phocagallery_categories.id,
		jos_phocagallery_categories.title,
		jos_phocagallery_categories.hits,
		(select filename from jos_phocagallery where jos_phocagallery.catid = jos_phocagallery_categories.id order by jos_phocagallery.id limit 1) as filename
		from jos_phocagallery_categories
		where jos_phocagallery_categories.id <> 1";		
		
		$sWhere = "";		
		$result = $dbconnection->query($sQuery . ' ' . $sWhere);
	}		

	// setNewsletter
	if ($_GET['method'] == 'setNewsletter')
	{
		if (isset($_GET['param']))
		{
			$sQuery = "select
			jos_acymailing_subscriber.email as newsletter_email,
			jos_acymailing_subscriber.name as newsletter_name,
			jos_acymailing_subscriber.enabled as newsletter_enabled,
			jos_acymailing_subscriber.html as newsletter_html
			from jos_acymailing_subscriber";
			//join jos_acymailing_listsub on jos_acymailing_listsub.subid = jos_acymailing_subscriber.subid
			//join jos_acymailing_list on jos_acymailing_list.listid = jos_acymailing_listsub.listid";

			if (isset($_GET['email']))
			{				
				//$sWhere = "where jos_acymailing_list.name = 'Newsletters' and jos_acymailing_subscriber.email = '" . $_GET['email'] . "'";
				// Derzeit gibt es nur eine Art von Newsletterzugeh�rigkeit, deswegen wird nicht nach dem Listennamen gesucht.
				// Wenn es irgendwann mehrere gibt, dann muss die Liste in jos_acymailing_listsub hinterlegt werden. Ausserdem muss die Query
				// oben angepasst werden (join auf jos_acymailing_listsub + join auf jos_acymailing_list)
				$sWhere = "where jos_acymailing_subscriber.email = '" . $_GET['email'] . "'";
			}
			else die('Error: no email address provided');
			
			// query db table with provided email-address
			if ($debug) echo "<p>Query String: " . $sQuery . ' ' . $sWhere . '</p>';
			$queryResult = $dbconnection->query($sQuery . ' ' . $sWhere);
			if(mysql_num_rows($queryResult)) 
			{				
				$item = mysql_fetch_assoc($queryResult);
					
				// trim leading end ending spaces and eliminate all HTML Tags
				foreach ($item as &$value) $value = trim(strip_tags($value));
				
				// array $result is returned later in json format and contains short information which action has been performed
				$result['name'] = $_GET['name'];

				switch($_GET['param'])
				{				
					case 'subscribe':
						$result['method'] = 'subscribe';
						
						if (!isset($_GET['name'])) die('Error no name provided');
												
						// check whether user is enabled
						if ($debug) echo "<p>newsletter_enabled: " . $item['newsletter_enabled'] . '</p>';
						if ($debug) echo "<p>newsletter_html: " . $item['newsletter_html'] . '</p>';
						if($item['newsletter_enabled'] == 1) 
						{	
							if ($debug) echo "<p>Benutzer ist bereits aktiviert";
							
							// user exists and is enabled -> don't perfrom subscription action but check whether required format has changed
							if(isset($_GET['html']))
							{								
								if($item['newsletter_html'] != $_GET['html'])
								{
									if ($debug) echo "<p>�ndere Format...</p>";
									$sQuery = "update jos_acymailing_subscriber
											   set html = " . $_GET['html'] . "
											   where email = '".$_GET['email']."'";
											   
									$result['action'] = 'format_changed';
								}								
								else
								{
									$sQuery = '';
									$result['action'] = 'none';
								}
							}
							else die('Error: Please provide html-Parameter for method getNewsletter');	
						}	
						else
						{
							if ($debug) echo "<p>Benutzer muss aktiviert werden</p>";
							
							if(isset($_GET['html']))
							{								
								if($item['newsletter_html'] != $_GET['html'])
								{							
									$sQuery = "update jos_acymailing_subscriber
											   set enabled = 1,
											   confirmed = 1,
											   accept = 1,
											   html = ".$_GET['html']."
											   where email = '".$_GET['email']."'";
								}
								else
								{
									$sQuery = "update jos_acymailing_subscriber
											   set enabled = 1,
											   confirmed = 1,
											   accept = 1
											   where email = '".$_GET['email']."'";
								
								}
							}
							else die('Error: Please provide html-Parameter for method getNewsletter');	
									   
							$result['action'] = 'enabled';
						}				
						break;
					case 'unsubscribe':
						$result['method'] = 'unsubscribe';
						
						// check whether user is enabled
						if($item['newsletter_enabled'] == 1) 
						{
							if ($debug) echo "<p>Benutzer muss disabled werden</p>";
							$sQuery = "update jos_acymailing_subscriber
									   set enabled = 0
									   where email = '".$_GET['email']."'";
									  
							$result['action'] = 'disabled';
						}
						else
						{
							if ($debug) echo "<p>Benutzer ist bereits deaktiviert</p>";
							$sQuery = '';
							$result['action'] = 'none';
						}
						break;
					default:
						die('Error: Parameter '.$_GET['param'].' not exists');
				}				
				
			}
			else
			{
				// subscriber with provided email address doesn't exist yet
				switch($_GET['param'])
				{				
					case 'subscribe':
						$result['method'] = 'subscribe';
						
						if ($debug) echo "<p>Benutzer muss angelegt werden</p>";
						$sQuery = "insert into jos_acymailing_subscriber(email,name,html,confirmed,enabled,accept)
								   values('" . $_GET['email'] . "','" . $_GET['name'] . "'," . $_GET['html'] . ",1,1,1);";					
								   
						$result['action'] = 'subscribed';
						break;
					case 'unsubscribe':
						$result['method'] = 'unsubscribe';
						
						if ($debug) echo "<p>Benutzer kann nicht deaktiviert werden, weil es ihn nicht gibt</p>";
						$sQuery = '';
						$result['action'] = 'none';
						break;
					default:
						die('Error: Parameter '.$_GET['param'].' not exists');	
				}
			}		
			
			if ($debug) echo "<p>Query: " . $sQuery . " </p>";
			if ($debug)
			{
				echo "Result: ";
				var_dump($result);
			}
			
			if (isset($sQuery) && $sQuery != '')
			{
				$modifyResult = $dbconnection->query($sQuery);
				if($debug) var_dump($modifyResult);
			}
		}
		else die('Error: Please provide param for method getNews');			
	}
	*/
	if (isset($result))
	{
		/*
		if($debug)
			echo "result is set<br><br>";
		*/

		// return json format
		$items = array();
		
		if(is_array($result)) // result comes from newsletter method
		{
			if($debug) echo "Array<br>";
			header('Content-type: application/json');
			$json =  json_encode($result);
		}
		else if(mysqli_num_rows($result)) // result comes from get methods
		{
			if(mysqli_num_rows($result) == 1)
			{
				$item = mysqli_fetch_assoc($result);
				$json = json_encode($item);	
			}
			else
			{
				while($item = mysqli_fetch_assoc($result)) 
				{
					if($debug) {
						echo "ID: " . $item["id"]. "<br>";
						echo "Title: " . $item["title"]. "<br>";
					}
					//$items[] = array('item'=>$item);	
					$items[] = $item;
					
				}
				//header('Content-type: application/json');
				//$json =  json_encode(array('items'=>$items));
				$json = json_encode($items);
			}
		}
		else die('Error: no data found for query');

		echo $json;		
	}

	$dbconnection->close();
}
?>
