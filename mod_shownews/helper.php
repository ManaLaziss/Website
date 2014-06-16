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
            $resultCat = $db->loadAssocList();
        }
        catch(RuntimeException $e){
            echo $e->getMessage();
        }		
		
		//searching for the cat with the show_news code	
		$catid = null;
		date_default_timezone_set("Europe/Berlin");
		$date = date('Y-m-d h:i:s', strtotime("-30 days"));
		if($resultCat != null){//has the result a failure
			for($i=0; $i < sizeof($resultCat); $i++){
				if(preg_match("#{show_news}#", $resultCat[$i]['description']) == 1){
						$catid = $resultCat[$i]['id'];
						break;
						}							
			}
	
			//+++Second, get the articles for the category which are not older than 30 days+++
			$result = null;
			$db = JFactory::getDbo();
			$query = $db->getQuery(true);
			$query->select('*') 
					->from('#__content')
					->where( 'catid='.$db->quote($catid) ); 
					//->where( 'catid='.$db->quote($catid).' and created >= '.$date );
				
					
			try {
				$db->setQuery($query);
				$result = $db->loadAssocList();
			}
			catch(RuntimeException $e){
				echo $e->getMessage();
			}	
		}else{echo "Failure in SQL: show_news didn't get the categories from the db";}					
        return $result;
    }
}
?>