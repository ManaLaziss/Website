function softscrollTo(anchor) {
	//get momentane scrollposition
	//get position des anchor
	//softscroll(stpos, curpos, despos);
	softscroll(0, 0, 500);
}

function softscroll(from, now, to) {
	var speed = (now-from)+1;
	var max = 25;
	speed=(speed<=max)?speed:max;
    window.scrollBy(0,speed);
    if (now<to)
    	setTimeout(function(){softscroll(from, now+speed, to)},100); 
}