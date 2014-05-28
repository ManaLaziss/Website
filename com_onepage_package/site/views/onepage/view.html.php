<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

/**
 * HTML View Klasse f�r die OnePage Komponente.
 */
class OnePageViewOnePage extends JViewLegacy
{
	
	// Die JViewLegacy::display() Methode wird �berschrieben
	function display($tpl = null) 
	{
		//Daten aus dem Model holen
		$this->categories = $this->get('Items');
		//Um sich die kategorie für das subtemplate zu merken
		$this->curcat = null;
		
		//nur wichtige informationen f�r json
		$this->json_items = array();
		$i = 0;
		foreach ($this->categories as $cat) {
			$this->json_items[$i] = new stdClass();
			$this->json_items[$i]->title = $cat->cattitle;
			$this->json_items[$i]->alias = $cat->alias;
			$this->json_items[$i]->text = $cat->text;
			$this->json_items[$i]->images = $cat->images;
			$this->json_items[$i]->articles = $cat->articles;
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