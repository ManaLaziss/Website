var DID_SCROLL = false; //um nicht zu viel Performance zu ziehen wird es in Intervallen behandelt
var CURRENTLY_SSCROLLING = false; //damit nicht zu viele SoftScrollEvents �berlappen
var ITEMS = null; //Die Kategorien und deren Artikel
var STOP_AUTO_SCROLL = false;

window.onscroll = function(){ 
	DID_SCROLL = true; 
};

setInterval(function(){if (DID_SCROLL)writeText();  DID_SCROLL=false;},200);

document.onmousedown = stopAutoScrolling;
document.onmousewheel = stopAutoScrolling;
document.onkeydown = function(event){ //scrollen auf Tastendruck
	
	if(event.which == 38) {//up
		//alert("Hoch");
		softScrollToPage("prev");
		event.stopImmediatePropagation(); //stoppt normale Ausf�hrung
		event.preventDefault();
	}
	else if(event.which == 40) {//down
		//alert("Runter");
		softScrollToPage("next");
		event.stopImmediatePropagation();
		event.preventDefault();
	}
	//alert(event.target); -> zB body
};

function stopAutoScrolling(){ //stopt Autoscrollen
	if(CURRENTLY_SSCROLLING) {
		STOP_AUTO_SCROLL = true;
		CURRENTLY_SSCROLLING = false;
	}
}

function softScrollToPage(dir) {//gibt scrollwert der letzten/n�chsten elementes mit Klasse "page"
	STOP_AUTO_SCROLL = false; //Automatisches scrollen wird initialisiert
	var start = getScrollXY().y, end=start, tmp={pos:null, i:null};
	var eles = document.getElementsByClassName("page");
	for (var i=0; i<eles.length; i++) {
		var pos = 0, par=eles[i];
		while (par != "html" && par != null) {//finde scrollposition
			pos += par.offsetTop;
			par = par.offsetParent;
		}
		if (dir =="next" && start<pos) {//gibt es ein n�chstes Element
			if (tmp.pos==null || pos<tmp.pos) {//neues element ist n�her an start
				tmp.pos = pos; //merken
				tmp.i = i;
			}
		}
		else if (dir =="prev" && start>pos) {//gibt es ein vorheriges Element
			if (tmp.pos==null || pos>tmp.pos) {//neues element ist n�her an start
				tmp.pos = pos; //merken
				tmp.i = i;
			}
		}
	}
	if (tmp.pos != null) end = tmp.pos;
	//if (eles[tmp.i].id != null) ; //gibt es eine id dann mach was damit
	if (!CURRENTLY_SSCROLLING) softscroll(start, end); //wenn nicht bereits gescrollt wird
	return end;
}


function softscrollTo(anchor) {
	STOP_AUTO_SCROLL = false; //Automatisches scrollen wird initialisiert
	//get momentane scrollposition
	var start = getScrollXY().y, end = 0;
	//hole position des anchor
	//var id = "category " + anchor;
	var ele = document.getElementById(anchor);
	if (ele == null) {
		var end = null;
	}
	while (ele != "html" && ele != null) {
		end += ele.offsetTop;//.scrollTop;
		ele = ele.offsetParent;
	}
	//softscroll(stpos, curpos, despos);
	if (end != null && !CURRENTLY_SSCROLLING) softscroll(start, end);
}

function softscroll(from, to, now, dir) {
	CURRENTLY_SSCROLLING = true;
	if(typeof now == 'undefined'){
		to = to-from;
		from = 0;
		now = 0;
		if (to < 0) {
			to = to * -1;
			dir = -1; //r�ckw�rts scrollen
		}
		else dir = 1; //vorw�rts scrollen
	}
	
	var max = 40;
	var sudist = 100; //Weg in Pixel bis Beschleunigung beendet
	var speed = 0;
	/*if ((now-from) <= sudist/2) var su = Math.round((max/sudist/2)*now); //Beschleunigungsfunktion in Abh. von Distanz
	else if ((now-from) <= sudist) var su = Math.round(-(max/sudist/2)*time+(2*max));
	else var su=0;*/
	if (to-from < sudist*2) sudist = (to-from)/2; //falls scrollen k�rzer als Beschleunigung
	if ((now-from) <= sudist) {
		speed = Math.round((max/sudist)*(now-from)+0.5); //aufrunden
	}
	else if ((to-sudist) <= now) {
		speed = Math.round(-(max/sudist)*(now-from)+(max/sudist*to)+0.5);
	}
	else speed = max;
    if (!STOP_AUTO_SCROLL && now<to) {
    	window.scrollBy(0,speed*dir);//Richtung beachten
    	setTimeout(function(){softscroll(from, to, now+speed, dir);},50);
    }
    else CURRENTLY_SSCROLLING = false; //zuende
    
 
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
function setItems(items) { ITEMS = items; }
function writeText(){ //stellt auch current item ein
	var scroll = getScrollXY().y, topoffset=10, tmp={pos:null, id:null};
	var eles = document.getElementsByClassName("page"); //holt sich divs mit inhalt
	var no_text = true; //man liegt au�erhalb des Textbereich
	for (var i=0; i<eles.length; i++) {
		var pos = 0, par=eles[i];
		while (par != "html" && par != null) {//finde scrollposition
			pos += par.offsetTop;
			par = par.offsetParent;
		}
		if (scroll-pos >= 0) {//div-position liegt auf/�ber scrollposition
			if (tmp.pos==null || scroll-pos<scroll-tmp.pos) {//neues element ist n�her an der scrollposition
				tmp.pos = pos; //merken
				tmp.id = eles[i].id; //id �bergeben
				no_text = false;
			}
		}
	}
	
	var text = " ";
	if (!no_text && tmp.id != "") {
		var alias = tmp.id.split(" ",2); //holt sich die kategorie- und artikel-alias aus der id
		for (var i=0; i<ITEMS.length; i++) {
			if (ITEMS[i].alias == alias[0]) { //sucht Kategorie
				text = ITEMS[i].text;
				if (alias[1] !== undefined) {
					for (var j=0; j<ITEMS[i].articles.length; j++) {
						if (ITEMS[i].articles[j].alias == alias[1]){
							text = ITEMS[i].articles[j].text;
							break;
						}
					}
				}
				break;
			}
		}
	}
	document.all.text.innerHTML = text;
}