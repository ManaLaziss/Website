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