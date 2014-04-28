function softscrollTo(anchor) {
	//get momentane scrollposition
	var start = getScrollXY().y;
	//hole position des anchor
	//var id = "category " + anchor;
	var ele = document.getElementById(anchor);
	var end = 0;
	while (ele != "html" && ele != null) {
		end += ele.offsetTop;//.scrollTop;
		ele = ele.offsetParent;
	}
	//softscroll(stpos, curpos, despos);
	softscroll(start, end);
}

function softscroll(from, to, now) {
	if(typeof now == 'undefined'){
		to = to-from;
		from = 0;
		now = 0;
	}
	
	var max = 40;	//maximale Scrollgeschwindigkeit
	var sudist = 100; //Weg in Pixel bis Beschleunigung beendet
	
	if (to-from < sudist*2) sudist = (to-from)/2; //falls scrollen kürzer als Beschleunigung
	if ((now-from) <= sudist) {
		speed = Math.round((max/sudist)*(now-from)+0.5); //aufrunden
	}
	else if ((to-sudist) <= now) {
		speed = Math.round(-(max/sudist)*(now-from)+(max/sudist*to));
	}
	else speed = max;
    if (now<to) {
    	window.scrollBy(0,speed);
    	setTimeout(function(){softscroll(from, to, now+speed);},50);
    }
 
}

function getScrollXY() {
    var scrOfX = 0, scrOfY = 0;
 
    if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return { x: scrOfX, y: scrOfY};
}
	//.getBoundingClientRect().top 