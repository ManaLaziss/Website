<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;
?>
<div id="debug">
 <?php /*DEBUG
		foreach ($this->cats as $i) { 
		print $i["id"] . " hat Kategorie: " . $i["catid"] . "<br>" ; 
		}
		*/
?>
</div>
<h1>Seite</h1>
<div id="content">

	<?php  //Ausgabe der Kategorien
	foreach ($this->categories as $cat) { 
	?>
<div id="category <?php echo $cat->alias; ?>" >
		<div class="page" id="<?php echo $cat->alias; ?>">
			<h2><?php echo $cat->cattitle; ?></h2>
			<p><?php echo $cat->images[0]; ?></p>
		</div>
		<?php
		//Ausgabe der zugehörigen Artikel(wenn es welche gibt)
		if ($cat->articles != null) {
			foreach ($cat->articles as $art) { 
			?>
		<div class="page" id="<?php echo $cat->alias; ?> <?php echo $art->alias; ?>">
				<h3><?php echo $art->title; ?></h3>
				<p><?php echo $art->images[0]; ?></p>
		</div>
			<?php } 
		}?>
	</div>
	<?php } ?>
	
</div>

<div id="text">
</div>

<script type="text/javascript">
    var items = <?php echo json_encode($this->json_items); ?>;
    setItems(items);
</script>