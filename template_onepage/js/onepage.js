var DID_SCROLL = false; //um nicht zu viel Performance zu ziehen wird es in Intervallen behandelt
var CURRENTLY_AUTOSCROLLING = false; //damit nicht zu viele SoftScrollEvents �berlappen
var ITEMS = null; //Die Kategorien und deren Artikel
var STOP_AUTO_SCROLL = false;

//===SCROLLING===============================//
//---allgemein-------------------------------
window.onscroll = function(){ 
	DID_SCROLL = true; 
};
setInterval(scrollActivities,100); //Aktivitäten nur alle 100ms wegen Performance
function scrollActivities() { //was passiert wenn gescrollt wird/wurde
	if (DID_SCROLL) { 
		activateFlex();
		if(!CURRENTLY_AUTOSCROLLING) writeText();//beim automatischen Scrollen nich (Performance)
	}  
	DID_SCROLL=false;
}
document.onmousedown = stopAutoScrolling; //keine Fehler bei Menü klicken oder selber scrollen
document.onmousewheel = stopAutoScrolling;


function stopAutoScrolling(){ //stopt Autoscrollen
	if(CURRENTLY_AUTOSCROLLING) {
		STOP_AUTO_SCROLL = true;
		CURRENTLY_AUTOSCROLLING = false;
		DID_SCROLL = true;
		scrollActivities(); //nach dem Automatischen scrollen
		//TODO hier randomImage() falls es durch scrollen zu sehr behindert wird
	}
}

//---scrollen bei Pfeiltaste-----------------
document.onkeydown = function(event){ //scrollen auf Tastendruck
	if(event.which == 38) {//up
		softScrollToPage("prev");
		event.stopImmediatePropagation(); //stoppt default Event
		event.preventDefault();
	}
	else if(event.which == 40) {//down
		softScrollToPage("next");
		event.stopImmediatePropagation();
		event.preventDefault();
	}
	//alert(event.target); -> zB body
};

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
	if (!CURRENTLY_AUTOSCROLLING) softscroll(start, end); //wenn nicht bereits gescrollt wird
	return end;
}

//---scrollen bei Menüklick-----------------
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
	if (end != null && !CURRENTLY_AUTOSCROLLING) softscroll(start, end);
}

function softscroll(from, to, now, dir) { //eigentliche automatische Scrollfunktion
	CURRENTLY_AUTOSCROLLING = true;
	if(typeof now == 'undefined'){
		to = to-from;
		from = 0;
		now = 0;
		if (to < 0) {
			to = to * -1;
			dir = -1; //rückwärts scrollen
		}
		else dir = 1; //vorwärts scrollen
	}
	
	var max = 40;
	var sudist = 100; //Weg in Pixel bis Beschleunigung beendet
	if (to-from < sudist*2) sudist = (to-from)/2; //falls scrollen kürzer als Beschleunigung
	var speed = 0;
	if ((now-from) <= sudist) { //beschleunigen
		speed = Math.round((max/sudist)*(now-from)+0.5); //aufrunden
	}
	else if ((to-sudist) <= now) { //bremsen
		speed = Math.round(-(max/sudist)*(now-from)+(max/sudist*to)+0.5);
	}
	else speed = max; //normal
    if (!STOP_AUTO_SCROLL && now<to) {
    	if (now+speed > to) speed = to-now; //damit nicht zu weit gescrollt wird bei rechenfehlern
    	window.scrollBy(0,speed*dir);//Richtung beachten
    	setTimeout(function(){softscroll(from, to, now+speed, dir);},50);
    }
    else stopAutoScrolling(); //zuende

	/* alte Beschleunigungsfkt:
	 * if ((now-from) <= sudist/2) var su = Math.round((max/sudist/2)*now); //Beschleunigungsfunktion in Abh. von Distanz
	else if ((now-from) <= sudist) var su = Math.round(-(max/sudist/2)*time+(2*max));
	else var su=0;*/
 
}

function getScrollXY() { //scrollposition
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
function setItems(items) { ITEMS = items; setUp(); /*loadStaffImg();*/}
var jobdescrtext = new Array();
function writeText(){ //stellt auch current item ein
	var text = "";
	var scroll = getScrollXY().y;
	var tmp_id=null;
	var eles = document.getElementsByClassName("page"); //holt sich divs mit inhalt
	var no_text = true; //man liegt au�erhalb des Textbereich
	for (var j=0; j<eles.length; j++) {
		var hl = null;
		if (elemVisible(eles[j]) > 0.1) {
			if (eles[j].getElementsByTagName("h2").length > 0) {hl=eles[j].getElementsByTagName("h2");}
			else if(eles[j].getElementsByTagName("h3").length > 0) {hl=eles[j].getElementsByTagName("h3");}
			else {}
			if (hl != null && elemVisible(hl[0]) == 1) {
				//--- Überschrift ein und ausblenden
				hl[0].className = "fade";
				
				var alias = eles[j].id.split(" ",2); //holt sich kategorie und artikel-alias aus der id
				
				//----------------------Inhalt für Mitarbeiter Seite -----------------------
				if (eles[j].parentNode.className == "category staff"){
					text+= "<div class=\"scollable\">"
					for (var i=0; i<MULTIPLE_IMAGES.length; i++) {
						if(MULTIPLE_IMAGES[i][0].split(" ",2)[0] == alias[0]) { //BIlder zur Kategorie
							text += "<div class=\"staffinfo\">" +
									"<div class=\"thumb\" id=\"" + alias[1] + "\">" +
									"<img src=\"" + MULTIPLE_IMAGES[i][1].src + "\" onclick=\"changeStaff('" + MULTIPLE_IMAGES[i][0]+ "')\"/></div>"; //das erste Bild ist fürs thumbnail
							//--- Text zum Bild suchen
							for (var h=0; h<ITEMS.length; h++){ 
								if (ITEMS[h].alias == alias[0]) {
									for (var g=0; g<ITEMS[h].articles.length; g++){
										if(ITEMS[h].articles[g].alias == MULTIPLE_IMAGES[i][0].split(" ",2)[1]) { //passend zum Bild
											var res = ITEMS[h].articles[g].text.match(new RegExp("([^]*){([^]*)}([^]*)"));
											if (res!=null) {
												text += res[1] + res[3] + "</div>";
												document.getElementById("c_text").innerHTML = res[2];
											}
											else text += ITEMS[h].articles[g].text + "</div>"
											break;
										}
									}
								}
							}
						}
					}
					text += "</div>";
				}
				//----------------------Inhalt für Google Maps Seite -----------------------
				else if (eles[j].parentNode.className == "category gmap"){
					text+= "";
						for (var h=0; h<ITEMS.length; h++){ 
							if (ITEMS[h].alias == alias[0] && ITEMS[h].articles!=null) {
								for (var g=0; g<ITEMS[h].articles.length; g++){
									//TODO: Auswerten der Artikel
								}
							}
						}
				}
				//----------------------Inhalt für Jobs Seite -----------------------
				else if (eles[j].parentNode.className == "category jobs"){
				text += "<div class=\"scollable\">";				
				
				for (var h=0; h<ITEMS.length; h++){ //alle items durchsuchen
					if (ITEMS[h].alias == alias[0]) {//is das aktuelle item in einer Unterkategorie der sichtbaren kategorie
						jobdescrtext = new Array(ITEMS[h].articles.length);
						for (var g=0; g<ITEMS[h].articles.length; g++){// ueber alle artikel laufen die Unterkategorie hat
							//text += "<div class=\"jobposinfo\">";
							text += "<a href=\"\" onclick=\"openWinJob(" + g + ");return false;\">" + ITEMS[h].articles[g].title + "</a>";
							jobdescrtext[g] = ITEMS[h].articles[g].title + "<br>" + ITEMS[h].articles[g].text;
						}
					}
				}				
				text += "</div>";
				}
				//----------------------Inhalt für normale Seite -----------------------
				else {
					for (var i=0; i<ITEMS.length; i++) {
						if (ITEMS[i].alias == alias[0]) { //sucht Kategorie
							text = ITEMS[i].text;
							if (alias[1] !== undefined) {
								for (var h=0; h<ITEMS[i].articles.length; h++) {
									if (ITEMS[i].articles[h].alias == alias[1]){
										text = ITEMS[i].articles[h].text;
										var winwidth = 0;
										if (!(winwidth = window.innerWidth)) winwidth = document.documentElement.clientWidth; //Browserkompabilität
										if (winwidth>1000 && text.length>300) document.all.text.className = "column";
										else document.all.text.className = "";
										break;
									}
								}
							}
							break;//text wurde gefunden
						}
					}
				}
			}
			else if(hl != null && elemVisible(hl[0]) == 0){
				hl[0].className = ""; //Überschrift wieder resetten
			}
		}
		else { //nicht sichbare Seiten Überschrift resetten
			if (eles[j].getElementsByTagName("h2").length > 0) {eles[j].getElementsByTagName("h2")[0].className="";}
			else if(eles[j].getElementsByTagName("h3").length > 0) {eles[j].getElementsByTagName("h3")[0].className="";}
			else {}
		}
	}
	document.all.text.innerHTML = text; //Text schreiben
}
//Funktion fuer Jobseite
function openWinJob(artnr) {
	var wintext = jobdescrtext[artnr] + '<br><br><a href="javascript:self.close()">Schließen</a>';
	var myWindow = window.open("", "myWindow", "width=640, height=480");
	myWindow.document.write(wintext);
	myWindow.moveTo( ((window.innerWidth / 2) - 320), ((window.innerHeight / 2) - 240) );
	}
function activateFlex() { //ab einer bestimmten Position scrollt Menü und Textfeld mit
	var scroll = getScrollXY().y;
	var menu = document.getElementById("m_flex");
	var fill = document.getElementById("fill");
	var text = document.getElementById("textbox");
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
		text.className = "flex";
	}
	else if (menu.className != "menu" && scroll-pos <= 0) {
		menu.className = menu.className.split(" ",1); //nimmt nur den ersten klassennamen
		menu.previousSibling.parentNode.removeChild(document.getElementById("fill"));
		//----Textbox ausblenden
		text.className = "unflex";
	}
	
}

function elemVisible(el){ //gibt sichtbaren horizontalen anteil des Elements zurück (nicht sichtbar bei 0) 0..1
	var winpos = getScrollXY().y;
	var winheight = 0;
	if (!(winheight = window.innerHeight)) winheight = document.documentElement.clientHeight; //Browserkompabilität
	
	var pos = findScrollPosition(el);
	var height = el.offsetHeight;
	
	if (pos<(winpos+winheight) && (pos+height)>winpos) {//Element im sichtbaren Bereich
		var from = (pos<winpos)? winpos : pos;
		var to = (pos+height>winpos+winheight)? winpos+winheight : pos+height;
		return ((to-from)/height); //Anteil vom element, Horizontal
	}
	return 0;
}

//--------------------BILDER-------------------------------------------------------------
var MULTIPLE_IMAGES = new Array();; //[][0] = id des divs [][i] = script für Bild
function setUp(){//verarbeitet Daten und speichert sie für spätere schnellere Verarbeitung
	//---merke Artikel mit mehr als 1 Bild
	if (ITEMS!=null) {
		var cnt = 0;
		for (var i=0; i<ITEMS.length; i++) {
			if (ITEMS[i].images != null && lITEMS[i].images.length > 1) { //für Kategorie-inhalt
				MULTIPLE_IMAGES[cnt][0] = ITEMS[i].alias + "_cont";
				for(var a=0; a<ITEMS[i].images.length; a++) {
					var image = new Image();
					image.src = ITEMS[i].images[a];
					MULTIPLE_IMAGES[cnt][a+1] = image;
				}
				cnt++;
			}
			if (ITEMS[i].articles!=null){
				for (var j=0; j<ITEMS[i].articles.length; j++) {
					if (ITEMS[i].articles[j].images != null && ITEMS[i].articles[j].images.length > 1) { //für Artikel
						MULTIPLE_IMAGES[cnt] = new Array();
						MULTIPLE_IMAGES[cnt][0] = ITEMS[i].alias + " " + ITEMS[i].articles[j].alias;
						for(var a=0; a<ITEMS[i].articles[j].images.length; a++) {
							var image = new Image();
							image.src = ITEMS[i].articles[j].images[a];
							MULTIPLE_IMAGES[cnt][a+1] = image;
						}
						cnt++;
					}
				}
			}
		}
	}
	//--- set the small logo like the big one
	document.getElementById("textlogo").getElementsByTagName("img")[0].src = document.getElementById("logo").src;
	
}


setInterval(randomImage,2000);
function randomImage() {
	if(MULTIPLE_IMAGES == null || CURRENTLY_AUTOSCROLLING) return; //der Performance wegen
	for (var i=0; i<MULTIPLE_IMAGES.length; i++) {
		var img = document.getElementById(MULTIPLE_IMAGES[i][0]);
		//--- wenn multiple Bilder vorhanden sind + wenn man das Bild nicht sieht 
		//--- !Spezialseiten werden nicht berücksichtigt, weil die Seiten eine andere id haben -> img == null
		if (img != null && elemVisible(img) == 0) { 
			img = img.getElementsByTagName("img");
			var num = Math.floor((Math.random()*(MULTIPLE_IMAGES[i].length-1)) + 1);
			img[0].src = MULTIPLE_IMAGES[i][num].src;
			img[0].onload = fitPicture(img[0]);
		}
	}
}
function changeStaff(id){
	var alias = id.split(" ",2); //[0] = Kategorie [1] = Artikel
	var div = document.getElementById(alias[0]+" _cont");
	//--- Artikelüberschrift (Name) als Überschrift und Bild einfügen
	for (var i=0; i<ITEMS.length; i++) {
		if (ITEMS[i].alias == alias[0]) {
			for (var j=0; j<ITEMS[i].articles.length; j++) {
				if (ITEMS[i].articles[j].alias == alias[1]) {
					div.getElementsByTagName("h3")[0].innerHTML = ITEMS[i].articles[j].title;
					div.getElementsByTagName("img")[0].src = ITEMS[i].articles[j].images[1];
					div.getElementsByTagName("img")[0].onload = fitPicture(div.getElementsByTagName("img")[0]);
					return;
				}
			}
		}
	}
	
}

window.onresize = fitContent;
window.onload = fitContent;
//setInterval(fitPictures,2000);

function fitContent() { 
	//--- Bilder anpassen
	var img = document.getElementsByClassName("artimg");
	for (var i = 0; i < img.length; i++) {	
		fitPicture(img[i]);
	}
	fitStartpage();
	
	//--- Text anpassen
	var text = "";
	var eles = document.getElementsByClassName("page"); //holt sich divs mit inhalt
	for (var j=0; j<eles.length; j++) {
		var hl = null;
		if (elemVisible(eles[j]) > 0.5) {
			if (eles[j].getElementsByTagName("h2").length > 0) {hl=eles[j].getElementsByTagName("h2");}
			else if(eles[j].getElementsByTagName("h3").length > 0) {hl=eles[j].getElementsByTagName("h3");}
			if (hl != null && elemVisible(hl[0]) == 1) {
				var alias = eles[j].id.split(" ",2); //holt sich kategorie und artikel-alias aus der id
				
				//----------------------Inhalt für normale Seite -----------------------
				for (var i=0; i<ITEMS.length; i++) {
					if (ITEMS[i].alias == alias[0]) { //sucht Kategorie
						text = ITEMS[i].text;
						if (alias[1] !== undefined) {
							for (var h=0; h<ITEMS[i].articles.length; h++) {
								if (ITEMS[i].articles[h].alias == alias[1]){
									text = ITEMS[i].articles[h].text;
									var winwidth = 0;
									if (!(winwidth = window.innerWidth)) winwidth = document.documentElement.clientWidth; //Browserkompabilität
									if (winwidth>1000 && text.length>300) document.all.text.className = "column";
									else document.all.text.className = "";
									break;
								}
							}
						}
						break;//text wurde gefunden
					}
				}
			}
		}
	}
}
function fitPicture(img) {
	var w = window.innerWidth;
    var h = window.innerHeight;

	var imgprop = img.naturalWidth/img.naturalHeight;
	var winprop = w/h; //gößeres winprop ist größere Breite im Vergleich zur Höhe, <1 Höhe gßer als Breite
	//---relative Bildhöhe ist gleich oder höher, gleiche Breite an
	if (winprop < imgprop) {
		var fact = (h / img.naturalHeight) * 1.0;
		img.width = img.naturalWidth * fact;
		img.height = h;
	}
	//---relative Bildhöhe ist kleiner, gleiche Höhe an
	else {
		var fact = (w / img.naturalWidth) * 1.0;
		img.height = img.naturalHeight * fact;
		img.width = w;	
	}
	

}

/*function loadStaffImg(){
	if(MULTIPLE_IMAGES == null) return;
	var imgsrc = null;
	var textcont = "";
	var img = null;
	for (var i=0; i<MULTIPLE_IMAGES.length; i++) {
		var id = MULTIPLE_IMAGES[i][0].split(" ",2); //Kategorie Alias und Artikel Alias
		var div = document.getElementById(id[0] +" _cont");
		if (div != null && div.parentNode.className == "category staff") { //Mitarbeiter Bilder finden
		
			if (imgsrc == null) { 
				img = div.getElementsByTagName("img");
				var pathArray = window.location.pathname.split( '/' );
				imgsrc = pathArray[0] + "/" + pathArray[1] + "/" + MULTIPLE_IMAGES[i][2]; //zweites Bild ist Hintergrund
			}
		}
	}
	img[0].src = imgsrc; //setzt HG
	document.all.text.innerHTML = textcont; //setzt Text
}*/

//--------------------Startseite-------------------------------------------------------------
function fitStartpage(){
    var h = window.innerHeight;
	var start = document.getElementById("cont");
	var menu = document.getElementById("m_static");
	
	var m_margin = parseInt(getStyle(menu,"margin-top"))+parseInt(getStyle(menu,"margin-bottom"));
	var s_margin = parseInt(getStyle(start,"margin-top"))+parseInt(getStyle(start,"margin-bottom"));
	var s_padding = parseInt(getStyle(start,"padding-top"))+parseInt(getStyle(start,"padding-bottom"));
	
	var erg = h - (menu.offsetHeight + m_margin + s_margin + s_padding);
	start.style.height = erg + "px";
	
	//--- logo höhe an Video anpassen
	var logo = document.getElementById("logo");
	var video = document.getElementById("video");
	video.onresize = function(){logo.style.height = video.clientHeight + "px";};
	video.onresize();
}
function findScrollPosition(elem) {
	var pos = 0, 
	par = elem;
	while (par != "html" && par != null) {
		pos += par.offsetTop;
		par = par.offsetParent;
	}
	return pos;
}
	//.getBoundingClientRect().top 



function getStyle(el,styleProp)
{
	if (el.currentStyle)
		var y = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
	return y;
}
/*
function setStyle(el,styleProp, value)
{
	if (el.currentStyle)
		var y = el.currentStyle.setProperty(styleProp, value);
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(el,null).setPropertyValue(styleProp, value);
	return y;
}
*/
