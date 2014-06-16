<?php 
//File for displaying data
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' ); ?>

<!-- Jobs Anzeige -->
<div id="jobshint">
<?php 
	if($catalias== null)
		echo "No Jobs";
	else
		echo "<a href='javascript:return false;' onclick=\"softscrollTo('category " . $catalias . "')\"> Jobs </a>"; 
	
?>
</div>