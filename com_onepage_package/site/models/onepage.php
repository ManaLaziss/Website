<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
 
// import Joomla modelitem library
jimport('joomla.application.component.modelitem');
 
/**
 * OnePage Model
 */
class OnePageModelOnePage extends JModelItem
{
 
	/**
	 * Get the message
	 * @return Menu Item array (id, catid, alias, catparent, cattitle, text, pictures, articles)
	 */
	public function getItems()
	{
		//TODO: Reihenfolge der Links überprüfen/ aktuelles Menü herausfinden, für den Fall dass man den Typ in anderen Menüs verwenden will
		//var mitems: Menu Items Parameter
		//var content_cats: Article Kategorien
		$app = JFactory::getApplication();
		$menutype = $app->getMenu()->getActive()->menutype; //holt sich aktuelles Men�
		$mitems = $app->getMenu()->getItems("menutype", $menutype); 
		$content_cats = JCategories::getInstance('Content');
		
		
		//hier werden die Parameter der Menu Items in ein Arraygeladen
		$i = 0;
		foreach($mitems as $args) {
			//Prüft ob das Objekt auch vom MenuItemTyp "Onepage" ist, sonst würde Anzeige scheitern
			if ($args->component == "com_onepage") {
				//läd Menu item ID, Kategorie-ID, Link-Alias, Kategorie-Parent, Kategorie-Titel, Kategorie-Text, Artikel( Array )
				$items[$i] = new stdClass(); //Standartobjekt
				$items[$i]->id = $args->id;
				$items[$i]->catid = $args->query["catid"];
				$items[$i]->alias = $args->alias; //fürs scrollen TODO: Vielleicht eher kategoriealias anstatt linkalias
				$items[$i]->catparent = "root";
				$items[$i]->cattitle = $content_cats->get($items[$i]->catid)->title;
				$items[$i]->text = $content_cats->get($items[$i]->catid)->description;
				$this->splitContent($items[$i]);
				
				$i++;
			}
		}
		
		//hier werden Unterkategorien an das Array mit den Menu"Link" Kategorien angehängt
		$i = 0;
		while(count($items)>$i) { //die Schleife berücksichtigt auch neue Elemente (Unter-Unterkat.)
			$cat = $content_cats->get($items[$i]->catid); //Lade CategoryNode Objekt
			if($cat->hasChildren()) {
				foreach ($cat->getChildren() as $child) {
				
					$items[count($items)] = new stdClass();
					$items[count($items)-1]->id = null;
					$items[count($items)-1]->catid = $child->id;
					$items[count($items)-1]->alias = $child->alias;
					$items[count($items)-1]->catparent = $child->parent_id;
					$items[count($items)-1]->cattitle = $child->title;
					$items[count($items)-1]->text = $child->description;
					$this->splitContent($items[count($items)-1]);
					
				}
			}
			
			//Hier werden sämtliche Artikel geladen
			$articles = $this->getArticles($items[$i]->catid);
			$j=0;
			//hole wichtige Parameter der Artikel
			foreach ($articles as $art) {
				//Kinder(Artikel): id, title, alias, text, pictures
				$tmp = new stdClass();
				$tmp->id = $art->id;
				$tmp->title = $art->title;
				$tmp->alias = $art->alias;
				$tmp->text = $art->introtext;
				$this->splitContent($tmp);
				
				$items[$i]->articles[$j] = $tmp; 
				$j++;
			}
			//falls es keine Artikel gibt...
			if (!isset($items[$i]->articles)) {
				$items[$i]->articles = null;
			}
			
			$i++;
		}
		return $items;
	}
	
	//DEBUG
	public function getMItems()
	{
		return JApplicationSite::getMenu()->getItems("menutype", "scrollmenu");
	}
	
	/**
	 * Get Articles of an Category
	 * @return array : parameters of all articles
	 */	
	public function getArticles($catid){
        $result = null;
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select('*') 
                ->from('#__content')
                ->where('catid='.$db->quote($catid));
                //->order('RAND() LIMIT 4'); // just an example for the ordering clause
        try {
            $db->setQuery($query);
            $result = $db->loadObjectList();
        }
        catch(RuntimeException $e){
            echo $e->getMessage();
        }
        return $result;
    }

    /**
     * get pictures and Text out of the content
     * @return array : parameters of all articles
     */
    public function splitContent(&$item){ //call by reference
    	
    	$text=$item->text;
    	$v = 0; 
    	//---Filtert nur Links (non-greedy) 
    	if ( $v = preg_match_all( "#src=[\'|\"](.*?)[\'|\"]#" , $text , $item->images) == 0 ||  $v === false) {
    		$item->images = null;
    	}
    	else {
    		$item->images = $item->images[1]; //weil sonst array im array
    	}
    	
    	//---Bilder entfernen
    	$text = preg_replace ( "#<img.*/>#" , "" , $text );
    	//---der einzige Weg leere Abs�tze mit gesch�tzten Leerzeichen zu entfernen
    	$item->text = preg_replace ( "#<p>[^[:alnum:]]*\xA0</p>|<p></p>|<p>\s*</p>#" , "" , $text );
    	return;
    }
}