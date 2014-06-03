<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;
?>

<div id="content">

<?php  //Ausgabe der Kategorien // TODO: Reihenfolge 
																	//print_r($this->categories);
foreach ($this->categories as $cat) {
	$this->curcat = $cat;
	if($cat->catparent == "root") {
		//print_r($this->curcat);
		echo $this->loadTemplate('category'); 
	}
}?>
</div>

<div id="textbox">
		<div id="textlogo">
			<img src="http://" width="100px"/>
		</div>
		<div id="texticons">
			<div class="bottom">
				<img src="<?php echo JURI::base() . 'images/onepage/gplus.png'; ?>" height="20px" width="20px" id="fb"/>
				<img src="<?php echo JURI::base() . 'images/onepage/fbook.png'; ?>" height="20px" width="20px" id="gp"/>
				<a>En</a> - <a>Impressum</a>
			</div>
		</div>
		<div id="text"></div>
</div>

<script type="text/javascript">
    var items = <?php echo json_encode($this->json_items); ?>;
    setItems(items);
</script>