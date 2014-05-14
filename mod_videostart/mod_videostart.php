<?php
/**
 * Video Start Page
 * 
 */
 
// no direct access
defined('_JEXEC') or die;
// Include the class of the syndicate functions only once
require_once(dirname(__FILE__).'/helper.php');
// Static call to the class
//$XXX = modContactListHelper::getXXX($params); //Daten aus helper.php
$vidfile = htmlspecialchars($params->get('vidfile')); //Parametereingaben
$prev_img = htmlspecialchars($params->get('prev_img')); //Parametereingaben
$logo_img = htmlspecialchars($params->get('logo_img')); //Parametereingaben
require_once(JModuleHelper::getLayoutPath('mod_videostart'));