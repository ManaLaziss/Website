<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

/**
 * HTML View Klasse für die OnePage Komponente.
 */
class OnePageViewOnePage extends JViewLegacy
{
	
	// Die JViewLegacy::display() Methode wird überschrieben
	function display($tpl = null) 
	{
		//Daten aus dem Model holen
		$this->categories = $this->get('Items');
		
		//nur wichtige informationen für json
		$this->json_items = array();
		$i = 0;
		foreach ($this->categories as $cat) {
			$this->json_items[$i] = new stdClass();
			$this->json_items[$i]->title = $cat->cattitle;
			$this->json_items[$i]->alias = $cat->alias;
			$this->json_items[$i]->text = $cat->text;
			$i++;
		}
		
		// Check for errors.
		if (count($errors = $this->get('Errors'))) 
		{
			JLog::add(implode('<br />', $errors), JLog::WARNING, 'jerror');
			return false;
		}
		// Display the view
		parent::display($tpl);
	}
}