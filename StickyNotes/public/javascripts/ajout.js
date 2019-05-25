var container = document.getElementById('container');
var ind = 3;
Gx = 0;
Gy = 0; 
	container.addEventListener("dblclick", myfun);
	function myfun(event){
		document.getElementById('popup').style.top = "60px";
		Gx = event.clientX;
	  	Gy = event.clientY;
	  	document.getElementById('x').value = Gx;
	  	document.getElementById('y').value = Gy;
	}

function ajout(){
	document.getElementById('popup').style.top = "-300px";

}



