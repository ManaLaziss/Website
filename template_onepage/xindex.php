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
$document->addScript($this->baseurl . '/templates/' . $this->template . '/js/onepage.js');
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
		<div class="page" id="start">
			<div class="menu" id="m_static"><jdoc:include type="modules" name="menu" style="xhtml" /></div>
			<jdoc:include type="modules" name="start" style="xhtml" />
		</div>
		<div class="menu" id="m_flex"><jdoc:include type="modules" name="menu" style="xhtml" /></div>
		<div id="scroll"><jdoc:include type="component" /></div>
	</body>
</html>