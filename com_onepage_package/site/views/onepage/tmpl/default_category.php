<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

$cat = $this->curcat; //lade momentane Kategorie

if (preg_match("#show_team#", $cat->text) != 1) { //überprüfe auf Spezialseite
?>

<script type="text/javascript">
	var popup = new Popup();
	popup.autoHide = false;
	popup.content =  'TODO: description for the selected job' + '<br><br><a href="#" onclick="'+popup.ref+'.hide();return false;">Schließen</a>';
	popup.width=640;
	popup.height=480;
	popup.style = {'border':'none','backgroundColor':'white'};
</script>
	
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
else {
	if (preg_match("#show_jobs#", $cat->text) != 1) {
		?>
		
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
	else {	
		?>

		<div class="category jobs" id="<?php echo "category " . $cat->alias; ?>" >
		<?php 
		if ($cat->articles != null) {//there must be articles
			foreach ($cat->articles as $art) { 				
				if ($art->images != null) { //there must be an image	?>
				
					<div class="page" id="<?php echo $cat->alias . ' _cont' ?>">
						<h2 class="contacts"><?php echo $cat->cattitle; ?></h2>
						<h3 class="contacts"><?php echo $art->title; ?></h3>
						<img  class="artimg" src="<?php echo $art->images[1] ?>" alt=""/>
						
						<!-- TODO: need erklärung @.@ wo wird text ausgegeben???? 
						<a href="#" onclick="popup.show();return false;"> Jobtitle </a>
						-->
					</div>
			<?php	break;
				}
			} 
		}
		?>
		</div>
		<?php
	
	}//end of job else
}
?>