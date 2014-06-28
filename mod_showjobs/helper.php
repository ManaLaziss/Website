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
            $resultCat = $db->loadAssocList();
        }
        catch(RuntimeException $e){
            echo $e->getMessage();
        }		
				
		//searching for the cat with the show_jobs code
		if($resultCat != null){//has the result a failure
			for($i=0; $i < sizeof($resultCat); $i++){
				if(preg_match("#{show_jobs}#", $resultCat[$i]['description']) == 1){
					return $resultCat[$i]['alias'];
					break;
				}
			}
		}else {echo "Failure in SQL: show_jobs didn't get the categories from the db"; return null;}	    
    }	
}
?>