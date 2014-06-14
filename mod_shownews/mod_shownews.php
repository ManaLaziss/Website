<?php
/**File for working with the data*/
 
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
// Include the syndicate functions only once
require_once( dirname(__FILE__).'/helper.php' );

$articles = modNewsHelper::getNewsArticles();
require( JModuleHelper::getLayoutPath( 'mod_shownews' ) );

//convert used attributes from resultset into Array
$text = "";
while($row = mysql_fetch_assoc($articles)){
	$text += "<div class=\"art\"><div class = \"cap\">" . $row['title'] . "</div>";
	$text += "<div class = \"date\">" . $row['created'] . "</div><br>";
	$text += "" .$row['fulltext'] . "</div>";
		}
?>