<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

// Eine Instanz des Controllers mit dem Pr�fix 'HalloWelt' beziehen
$controller = JControllerLegacy::getInstance('OnePage');
 
$task = JFactory::getApplication()->input->getCmd('task');
 
// Den 'task' der im Request �bergeben wurde ausf�hren
$controller->execute($task);
 
// Einen Redirect durchf�hren wenn er im Controller gesetzt ist
$controller->redirect();