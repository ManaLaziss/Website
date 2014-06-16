<?php
//File for working with data
/**
 * for showing jobs module
 * 
 * @package     Joomla
 * @subpackage  Modules
 * @author		Sara Schoenherr, Anne Richter
 */
 
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
// Include the syndicate functions only once
require_once( dirname(__FILE__).'/helper.php' );
 
$catalias = modJobsHelper::getJobCat();
require( JModuleHelper::getLayoutPath( 'mod_showjobs' ) );
?>