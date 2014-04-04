<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

// Eine Instanz des Controllers mit dem Präfix 'HalloWelt' beziehen
$controller = JControllerLegacy::getInstance('OnePage');
 
$task = JFactory::getApplication()->input->getCmd('task');
 
// Den 'task' der im Request übergeben wurde ausführen
$controller->execute($task);
 
// Einen Redirect durchführen wenn er im Controller gesetzt ist
$controller->redirect();