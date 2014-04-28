<?php
/**
 * @version    $Id$
 * @package    Joomla!
 * @copyright  Copyright (C) 2014. All rights reserved.
 * @license    GNU/GPL, see LICENSE.php
 * Joomla! is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 * See COPYRIGHT.php for copyright notices and details.
 */

// Verhindern, dass diese php-Datei direkt aufgerufen wird
defined('_JEXEC') or die('Restricted access');

$app = JFactory::getApplication();
$document = JFactory::getDocument();
$document->addScript($this->baseurl . '/templates/' . $this->template . '/js/onepage.js'); //javascript hinzufügen
//Parameter des Templates laden
$templateparams	= $app->getTemplate(true)->params;
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>">
	<head>
		<jdoc:include type="head" />
		<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/template.css" type="text/css" />
	</head>
	<body>
		<div id="menu"><jdoc:include type="modules" name="menu" style="xhtml" /></div>
		<div id="scroll"><jdoc:include type="component" /></div>
		<div id="text"><jdoc:include type="modules" name="text" style="xhtml" /></div>
	</body>
</html>