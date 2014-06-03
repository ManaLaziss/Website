<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

$cat = $this->curcat; //lade momentane Kategorie

if (preg_match("#show_team#", $cat->text) != 1) { //überprüfe auf Spezialseite

?>
	
	<div class="category" id="<?php echo "category " . $cat->alias; ?>" >
	<?php 
	//--- Kategorieinhalt ausgeben (falls Bild vorhanden ist) 
	if ($cat->images != null) {  ?> 
		<div class="page" id="<?php echo $cat->alias . " _cont"; ?>">
			<h2><?php echo $cat->cattitle; ?></h2>
			<img  class="artimg" src="<?php echo $cat->images[0]; ?>" alt="" />
		</div>
	<?php }
	
	//--- Ausgabe der zugehörigen Artikel (wenn es welche gibt)
	if ($cat->articles != null) {
		foreach ($cat->articles as $art) {
			if ($art->images != null) { //nur ausgeben wenn Bild vorhanden ist	?>
				<div class="page" id="<?php echo $cat->alias . ' ' . $art->alias; ?>">
					<h3><?php echo $art->title; ?></h3>
					<img  class="artimg" src="<?php echo $art->images[0]; ?>" alt="" />
				</div>
		<?php }
		} 
	}
	
	//--- Ausgabe der zugehörigen Unterkategorien
	foreach ($this->categories as $ucat) {		                               
		if ($ucat->catparent == $cat->catid ) {
			if ( $ucat->articles != null) { //nur wenn die Unterkategorie irgendeinen Inhalt hat
				$content = false;
				if ($ucat->images != null) { $content = true;} //hat selber Inhalt
				foreach ($ucat->articles as $uart) { //prüfe Artikel auf Inhalt
					if ($uart->images != null) { $content = true;}
				}
				if ($content == true) {
					$this->curcat = $ucat;
					echo $this->loadTemplate('category');
				}
			}
		}
	}?>
	</div>
	
<?php }
//---------------------- Anzeige für Mitarbeiterseite ----------
else {?>

	<div class="category staff" id="<?php echo "category " . $cat->alias; ?>" >
	<?php 
	//--- Ausgabe des Bildes für die erste Seite die eines besitzt
	if ($cat->articles != null) {
		foreach ($cat->articles as $art) { 				
			if ($art->images != null) { //nur ausgeben wenn Bild vorhanden ist	?>
			
				<div class="page" id="<?php echo $cat->alias . ' _cont' ?>">
					<h2 class="contacts"><?php echo $cat->cattitle; ?></h2>
					<h3 class="contacts"><?php echo $art->title; ?></h3>
					<img  class="artimg" src="<?php echo $art->images[1] ?>" alt=""/>
				</div>
		<?php	break;
			}
		} 
	}
	?>
	</div>
	<?php
}
?>