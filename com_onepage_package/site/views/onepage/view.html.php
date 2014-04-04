<?php
// Den direkten Aufruf verbieten
defined('_JEXEC') or die;

/**
 * HTML View Klasse f�r die OnePage Komponente.
 */
class OnePageViewOnePage extends JViewLegacy
{
	/**
	 * @var string
	 */
	protected $hallo = '';

	// Die JViewLegacy::display() Methode wird �berschrieben
	public function display($tpl = null)
	{
		// Die Daten werden dem View zugewiesen
		$this->hallo = 'Hallo Welt!';

		// Der View wird angezeigt
		parent::display($tpl);
	}
}