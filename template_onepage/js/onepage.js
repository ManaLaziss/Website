var DID_SCROLL = false; //um nicht zu viel Performance zu ziehen wird es in Intervallen behandelt
var CURRENTLY_SSCROLLING = false; //damit nicht zu viele SoftScrollEvents �berlappen
var ITEMS = null; //Die Kategorien und deren Artikel
var STOP_AUTO_SCROLL = false;

window.onscroll = function(){ 
	DID_SCROLL = true; 
};
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
setInterval(scrollActivities,100);
function scrollActivities() { //was passiert wenn gescrollt wird
	if (DID_SCROLL) {
		activateFlex();
		writeText();
	}  
	DID_SCROLL=false;
}

function softScrollToPage(dir) {//gibt scrollwert der letzten/n�chsten elementes mit Klasse "page"
	STOP_AUTO_SCROLL = false; //Automatisches scrollen wird initialisiert
	var start = getScrollXY().y, 
	end=start, 
	tmp={pos:null, i:null};
	var eles = document.getElementsByClassName("page");
	for (var i=0; i<eles.length; i++) {
		var pos = findScrollPosition(eles[i]);
		if (dir =="next" && start<pos) {//gibt es ein n�chstes Element
			if (tmp.pos==null || pos<tmp.pos) {//neues element ist n�her an start
				tmp.pos = pos; //merken
				tmp.id = eles[i].id;
			}
		}
		else if (dir =="prev" && start>pos) {//gibt es ein vorheriges Element
			if (tmp.pos==null || pos>tmp.pos) {//neues element ist n�her an start
				tmp.pos = pos; //merken
				tmp.id = eles[i].id;
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

//---------------- Text and Menu Manipulation --------------------------------------------------------//
function setItems(items) { ITEMS = items; setUp(); }
function writeText(){ //stellt auch current item ein
	var scroll = getScrollXY().y, 
	topoffset=10, 
	tmp={pos:null, id:null};
	var eles = document.getElementsByClassName("page"); //holt sich divs mit inhalt
	var no_text = true; //man liegt au�erhalb des Textbereich
	for (var i=0; i<eles.length; i++) {
		var pos = findScrollPosition(eles[i]);
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
		var alias = tmp.id.split(" ",2); //holt sich kategorie und artikel-alias aus der id
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
function activateFlex() { //ab einer bestimmten Position scrollt Menü und Textfeld mit
	var scroll = getScrollXY().y;
	var menu = document.getElementById("m_flex");
	var fill = document.getElementById("fill");
	var text = document.getElementById("text");
	if (fill != undefined) var pos = findScrollPosition(fill);
	else var pos = findScrollPosition(menu);
	
	if (menu.className == "menu" && scroll-pos > 0) {
		//----neues Element um Menü Lücke zu füllen : TODO: Höhe IMMER an Menühöhe anpassen
		fill = document.createElement('div');
		fill.id = "fill";
		fill.style.height = menu.offsetHeight+"px";
		fill.style.width = "100%";
		menu.parentNode.insertBefore(fill, menu);
		//----Menü abtrennen
		menu.className += " flex";
		//----Textbox einblenden
	}
	else if (menu.className != "menu" && scroll-pos <= 0) {
		menu.className = menu.className.split(" ",1); //nimmt nur den ersten klassennamen
		menu.previousSibling.parentNode.removeChild(document.getElementById("fill"));
		//----Textbox ausblenden
	}
	
	
}
//--------------------BILDER-------------------------------------------------------------
var MULTIPLE_IMAGES = new Array();; //[][0] = id des divs [][i] = script für Bild
function setUp(){
	//---merke Artikel mit mehr Bildern
	if (ITEMS!=null) {
		for (var i=0; i<ITEMS.length; i++) {
			var cnt = 0;
			if (ITEMS[i].images != null && lITEMS[i].images.length > 1) { //für Kategorie-inhalt
				MULTIPLE_IMAGES[cnt][0] = ITEMS[i].alias + "_cont";
				for(var a=0; a<ITEMS[i].images.length; a++) {
					MULTIPLE_IMAGES[cnt][a+1] = ITEMS[i].images[a];
				}
				cnt++;
			}
			if (ITEMS[i].articles!=null){
				for (var j=0; j<ITEMS[i].articles.length; j++) {
					if (ITEMS[i].articles[j].images != null && ITEMS[i].articles[j].images.length > 1) { //für Artikel
						MULTIPLE_IMAGES[cnt] = new Array();
						MULTIPLE_IMAGES[cnt][0] = ITEMS[i].alias + " " + ITEMS[i].articles[j].alias;
						for(var a=0; a<ITEMS[i].articles[j].images.length; a++) {
							MULTIPLE_IMAGES[cnt][a+1] = ITEMS[i].articles[j].images[a];
						}
						cnt++;
					}
				}
			}
		}
	}
	
}
setInterval(randomImage,2000);
function randomImage() {
	if(MULTIPLE_IMAGES == null) return "";
	for (var i=0; i<MULTIPLE_IMAGES.length; i++) {
		var img = document.getElementById(MULTIPLE_IMAGES[i][0]);
		img = img.getElementsByTagName("img");
		var num = Math.floor((Math.random()*(MULTIPLE_IMAGES[i].length-1)) + 1);
		var pathArray = window.location.pathname.split( '/' );
		img[0].src = pathArray[0] + "/" + pathArray[1] + "/" + MULTIPLE_IMAGES[i][num];
	}
	return img.src;
}
//--------------------/BILDER-------------------------------------------------------------
function findScrollPosition(elem) {
	var pos = 0, 
	par = elem;
	while (par != "html" && par != null) {
		pos += par.offsetTop;
		par = par.offsetParent;
	}
	return pos;
}