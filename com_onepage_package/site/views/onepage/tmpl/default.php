<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;
?>

<div id="content">

<?php  //Ausgabe der Kategorien
foreach ($this->categories as $cat) { 
?>
	<div class="category" id="<?php echo "category " . $cat->alias; ?>" >
	<?php if ($cat->images != null) { //nur ausgeben wenn Bild vorhanden ist ?> 
		<div class="page" id="<?php echo $cat->alias . "_cont"; ?>">
			<h2><?php echo $cat->cattitle; ?></h2>
			<?php echo $cat->images[0]; ?>
		</div>
	<?php }
	
	//Ausgabe der zugeh�rigen Artikel(wenn es welche gibt)
	if ($cat->articles != null) {
		foreach ($cat->articles as $art) { 
			if ($art->images != null) { //nur ausgeben wenn Bild vorhanden ist	?>
				<div class="page" id="<?php echo $cat->alias . ' ' . $art->alias; ?>">
					<h3><?php echo $art->title; ?></h3>
					<img src="<?php echo $art->images[0]; ?>" alt="" />
				</div>
		<?php }
		} 
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