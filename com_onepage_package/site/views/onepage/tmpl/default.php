<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;
?>
 
<h1>Seite</h1>
<div id="content">

	<?php  //Ausgabe der Kategorien
	foreach ($this->categories as $cat) { 
	?>
	<div id="category <?php echo "$cat->alias"; ?>" >
		<h2><?php echo $cat->cattitle; ?></h2>
		<div class="text">
			<?php echo $cat->text; ?>
		</div>
		<div class="articles">
		<?php
		//Ausgabe der zugehörigen Artikel(wenn es welche gibt)
		if ($cat->articles != null) {
			foreach ($cat->articles as $art) { 
			?>
				<h3><?php echo $art->title; ?></h3>
				<div id="<?php echo "$art->alias"; ?>" >
					<?php echo $art->text; ?>
				</div>
			<?php } 
		}?>
		</div>
	</div>
	<?php } ?>
	
</div>