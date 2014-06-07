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
			//--- Google maps anstadt Bild 
			if (preg_match("#show_map#", $art->text) == 1) { ?>
				<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
				<script>
					function initialize() {
					  var myLatlng = new google.maps.LatLng(51.009351,13.814221);
					  var mapOptions = {
					    zoom: 12,
					    center: myLatlng,

					    mapTypeControl: true,
					    mapTypeControlOptions: {
					        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					        position: google.maps.ControlPosition.RIGHT_CENTER
					    },
					    zoomControl: true,
					    zoomControlOptions: {
					    	style: google.maps.ZoomControlStyle.LARGE,
					    	position: google.maps.ControlPosition.LEFT_CENTER
					    },
					    panControl: false,
					    scaleControl: true,
					    scaleControlOptions: {
					    	position: google.maps.ControlPosition.LEFT_CENTER
					    },
					    streetViewControl: true,
					    overviewMapControl: false,


					    scrollwheel: false,
					  }
					  var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
					
					  var marker = new google.maps.Marker({
					      position: myLatlng,
					      map: map,
					      title: 'Hello World!'
					  });
					}
					
					google.maps.event.addDomListener(window, 'load', initialize);

    			</script> 
				<div class="page gmap" id="<?php echo $cat->alias . ' ' . $art->alias; ?>">
					<h3><?php echo $art->title; ?></h3>
					<div id="gmap"></div>
				</div> <?php 
			}
			else if ($art->images != null) { //nur ausgeben wenn Bild vorhanden ist	?>
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