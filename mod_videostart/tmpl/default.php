<?php
// no direct access
defined('_JEXEC') or die; ?>

<div id="cont">
	<!-- Banner -->
	
	<img id="logo" src="<?php echo JURI::base() . $logo_img; ?>" height="720" width="" alt="Dresdner Spitze Logo">
	
	
	<!-- Video -->
	<video controls autoplay width="" height="720" controls poster="<?php echo JURI::base() . $prev_img; ?>">
	  <source src="<?php echo JURI::base() . "/videos/". $vidfile; ?>" type="video/mp4">
	<!--   <source src="<?php echo JURI::base() . "/videos/" . $vidfile; ?>" type="video/ogg"> -->
	Your browser does not support the video tag.
	</video>
</div>