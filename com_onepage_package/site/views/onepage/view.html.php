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
                // Kategorien vom Komponententyp onepage vom Model anfragen
 				$this->categories = $this->get('Items');
 				
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