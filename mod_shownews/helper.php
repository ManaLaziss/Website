<?php
//File for getting Data
/**
 * Helper class for showing lated news module
 * 
 * @package     Joomla
 * @subpackage  Modules
 * @author		Sara Schoenherr, Anne Richter
 */
class modNewsHelper
{
    /**
     * Retrieves the hello message
     *
     * @param array $params An object containing the module parameters
     * @access public
     */    
    public static function getHello( $params )
    {
        return 'Hello, World!';
    }
	
	 /**
     * Recrieves the articles for the news which are not older than 30 days
	 *
	 * @return array with the filtered articles
	 * @access public
     */  
	public static function getNewsArticles() {
		
		//+++First, get the right category+++			
		 $resultCat = null;
		
		//get all categories
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select('*') 
                ->from('#__categories');
				
		try {
            $db->setQuery($query);
            $resultCat = $db->loadObjectList();
        }
        catch(RuntimeException $e){
            echo $e->getMessage();
        }		
				
		//searching for the cat with the show_news code
		while($row = mysql_fetch_assoc($resultCat)) {
			if(preg_match("#show_news#", $row['description']) == 1){
				$catid = $row['id'];
				break;
				}							
		}	
	
		//+++Second, get the articles for the category which are not older than 30 days+++
        $result = null;
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select('*') 
                ->from('#__content')
                ->where( 'catid='.$db->quote($catid) 'and created >=' .(getdate('Y-m-d h:i:s', strtotime("-30 days"))) ); 
				
        try {
            $db->setQuery($query);
            $result = $db->loadObjectList();
        }
        catch(RuntimeException $e){
            echo $e->getMessage();
        }						
        return $result;
    }
}
?>