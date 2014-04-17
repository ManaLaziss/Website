<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

/**
 * HTML View Klasse für die OnePage Komponente.
 */
class OnePageViewOnePage extends JViewLegacy
{
	/**
	 * @var string
	 */
	protected $hallo = '';

	// Die JViewLegacy::display() Methode wird überschrieben
        function display($tpl = null) 
        {
                // Assign data to the view
                $this->msg = $this->get('Msg');
 
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