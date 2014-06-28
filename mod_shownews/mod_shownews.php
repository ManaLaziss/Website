<?php
/**File for working with the data*/
 
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
// Include the syndicate functions only once
require_once( dirname(__FILE__).'/helper.php' );

$articles = modNewsHelper::getNewsArticles();
require( JModuleHelper::getLayoutPath( 'mod_shownews' ) );

//convert used attributes from resultset into Array
$text = null;
if($articles != null){
	$text = "";
	for($i=0; $i < sizeof($articles); $i++){
		$text .= "<div class = \"date\"> News vom " . $articles[$i]['created'] . ": </div><br>";
		$text .= "<div class=\"art\"><div class = \"cap\">" . $articles[$i]['title'] . "</div>";
		$text .= "" .$articles[$i]['introtext'] . "<br><br></div>";
			}
		}
?>

<script type="text/javascript">

	function openWin() {
		
	var wintext = '<?php echo $text; ?>' + '<br><br><a href="javascript:self.close()">Schließen</a>';
	var myWindow = window.open("", "myWindow", "width=640, height=480, directories=no, titlebar=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=no, resizable=no");
	myWindow.document.write(wintext);
	myWindow.moveTo( ((window.innerWidth / 2) - 320), ((window.innerHeight / 2) - 240) );
	}	
</script>