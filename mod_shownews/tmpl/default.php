<?php
//File for showing data
/**
 * File for showing Data from the lated news module
 * 
 * @package     Joomla
 * @subpackage  Modules
 * @author		Sara Schoenherr, Anne Richter
 */
 defined( '_JEXEC' ) or die( 'Restricted access' ); ?>

<script type="text/javascript">
	var popup = new Popup();
	popup.autoHide = false;
	popup.content =  '<?php echo $text; ?>' + '<br><br><a href="#" onclick="'+popup.ref+'.hide();return false;">Schlieﬂen</a>';
	popup.width=640;
	popup.height=480;
	popup.style = {'border':'none','backgroundColor':'white'};
</script>
 

<!-- News Anzeige -->
<div id="newshint">
	<a href="#" onclick="popup.show();return false;">News</a>
</div>



