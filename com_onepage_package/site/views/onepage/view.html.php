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
	public function display($tpl = null)
	{
		// Die Daten werden dem View zugewiesen
		$this->hallo = 'Hallo Welt!';

		// Der View wird angezeigt
		parent::display($tpl);
	}
}