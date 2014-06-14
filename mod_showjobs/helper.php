<?php
//File for getting Data
/**
 * Helper class for showing jobs module
 * 
 * @package     Joomla
 * @subpackage  Modules
 * @author		Sara Schoenherr, Anne Richter
 */
class modJobsHelper
{
    /**
     * Recrieves the category for the jobs
	 *
	 * @return alias for jumping to the right place on the side
	 * @access public
     */  
	public static function getJobCat() {
			
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
				
		//searching for the cat with the show_jobs code
		while($row = mysql_fetch_array($resultCat)) {
			if(preg_match("#show_jobs#", $row['description']) == 1){
				return $row['alias'];
				break;
				}							
		}	    
    }	
}
?>