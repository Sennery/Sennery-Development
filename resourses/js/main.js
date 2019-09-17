animate([line,transitionOnScroll]);

window.onload = function(){
	setTimeout(()=>{
		scrollOptions = {
	    	 top: 0 
	  	}
		window.scrollTo(scrollOptions);

		let preloader = document.querySelector('.preloader');

		preloader.style.opacity = 0;
		setTimeout(()=>(
			preloader.style.display = 'none'
		),1000);

		setTimeout(function() {
			document.body.classList.remove("hidecontent");
		}, 500);
	},1000);	
}

var mainBlock 	= document.querySelector('.main_block');
var sign		= document.querySelector('.sign');
var background 	= document.getElementById('background');
var icons 		= document.getElementById('icons');
var footer 		= document.querySelector('.footer');
var blurScreen 	= document.querySelector('.blurScreen');

function transitionOnScroll() {
	 var scrolled = window.pageYOffset;

	 if(scrolled / document.documentElement.clientHeight >= 0.2) mainBlock.style.filter = 'blur(2px)';
	 else mainBlock.style.filter = 'blur(0px)';

	 blurScreen.style.opacity = scrolled / 700; 

	 if (scrolled >= 500) getUp.style.display = 'block';
	 else getUp.style.display = 'none';

	 if (scrolled / document.documentElement.clientHeight >= 0.1) botMen.children[0].classList.add('visible');
	 if (scrolled / document.documentElement.clientHeight >= 0.35) botMen.children[1].classList.add('visible');
	 if (scrolled / document.documentElement.clientHeight >= 0.6) botMen.children[2].classList.add('visible');
	 if (scrolled / document.documentElement.clientHeight >= 0.85) botMen.children[3].classList.add('visible');
}

botMen.onmouseover = function(event) {
	var elem;
	if (event.target.classList.contains('razdel'))
		elem = event.target.firstElementChild.nextElementSibling;
	if (event.target.tagName == 'DIV')
		elem = event.target.nextElementSibling;
	if (event.target.tagName == 'P')
		elem = event.target.parentNode.parentNode.firstElementChild.nextElementSibling;

	if (elem == null) return;

	var pic		= (elem.classList.contains('pic')) ? elem : elem.nextElementSibling;
	var cont	= (elem.classList.contains('pic')) ? elem.nextElementSibling : elem;

	if (pic == null) return;
	if (pic.firstElementChild == null) return;

	pic.firstElementChild.classList.add('picIncr');
	cont.firstElementChild.classList.add('contBright');
	elem.previousElementSibling.classList.add('zatemOn');
}

botMen.onmouseout = function(event) {
	var elem
	if (event.target.classList.contains('razdel'))
		elem = event.target.firstElementChild.nextElementSibling;
	if (event.target.tagName == 'DIV')
		elem = event.target.nextElementSibling;
	if (event.target.tagName == 'P')
		elem = event.target.parentNode.parentNode.firstElementChild.nextElementSibling;

	if (elem == null) return;

	var pic 	= (elem.classList.contains('pic')) ? elem : elem.nextElementSibling;
	var cont 	= (elem.classList.contains('pic')) ? elem.nextElementSibling : elem;

	if (pic == null) return;
	if (pic.firstElementChild == null) return;

	pic.firstElementChild.classList.remove('picIncr');
	cont.firstElementChild.classList.remove('contBright');
	elem.previousElementSibling.classList.remove('zatemOn');
}

var tempInfo;
var tempTop;

var enable = function() {
	tempInfo.classList.remove('disable');
}

var disable = function() {
	tempInfo.classList.add('disable');
	tempInfo = null;
}

botMen.onclick = function(event) {
	var elem 	= event.target.parentNode.parentNode;
	var target 	= event.target;

	if (elem.children.length < 5) {
		elem 	= elem.parentNode;
		target 	= target.parentNode;
	}

	for (var i = 0; i < elem.children.length - 5; i++) {
		console.log(elem.children[i]);
		console.log(target.parentNode);

		if (elem.children[i] != target.parentNode) {
			elem.children[i].classList.add('disable');
			elem.lastElementChild.classList.add('visible');
		} else {
			tempInfo 	= elem.children[i + 4];
			tempTop 	= elem.children[i];
			tempTop.classList.add('top');
			tempTop.addEventListener("transitionend", enable);
		}
	}

}
inf1.onclick 		= inf2.onclick 		= inf3.onclick 		= inf4.onclick 		= function(event) {
	event.stopPropagation();
}

inf1.onmouseover 	= inf2.onmouseover 	= inf3.onmouseover 	= inf4.onmouseover 	= function(event) {
	event.stopPropagation();
}

inf1.onmouseout 	= inf2.onmouseout 	= inf3.onmouseout 	= inf4.onmouseout 	= function(event) {
	event.stopPropagation();
}

krest.onclick = function(event) {
	var elem = event.target.parentNode;
	tempTop.removeEventListener("transitionend", enable);
	disable();
	for (var i = 0; i < elem.children.length - 5; i++) {
		elem.children[i].classList.remove('disable');
		elem.children[i].classList.remove('top');
		event.target.classList.remove('visible');
	}
}

pyatnashki_h1.onclick = function() {
	var game = new Game();
}

getUp.onclick = function(event){	
	scrollOptions = {
    	top: 0,
    	behavior:'smooth' 
  	}
	window.scrollTo(scrollOptions);
}

var context = document.getElementById('transit').getContext('2d');

context.canvas.width 	= document.documentElement.clientWidth;
context.canvas.height 	= document.documentElement.clientHeight;

function line(x,y) {	
   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
   context.beginPath();
   context.moveTo(0, context.canvas.height);
   context.quadraticCurveTo((context.canvas.width/2)*y,
                         (context.canvas.height)*x,
                         context.canvas.width, context.canvas.height);
   context.fillStyle = 'rgba(255,255,255,1)';
   context.fill();
 }

 function animate(draw){

  let timeFrom 		= performance.now();
  let distanceFrom 	= window.pageYOffset;
  let speed 		= 0;
  let currentMouseX = document.body.clientWidth/2;
  let mouseX 		= document.body.clientWidth/2;

  document.addEventListener('mousemove', (e) => {
      currentMouseX = e.clientX;
  });

  requestAnimationFrame(function animate(time) {
    let timeDifference 	= time - timeFrom;
    timeFrom 			= time;

    let currentSpeed 	= (window.pageYOffset - distanceFrom)/timeDifference;

    //console.log('Speed = ' + speed + ' Current Speed = ' + currentSpeed);

    if(speed - currentSpeed >= 0) 
      speed = (Math.abs(speed - currentSpeed) <= 0.05) ? 
  		(currentSpeed != 0) ? 
  		currentSpeed : 
  		speed -=0.006 : 
  		speed -=0.006;
    else
      speed = (Math.abs(currentSpeed - speed) <= 0.015) ? currentSpeed : speed +=0.01;

    if(currentMouseX - mouseX === 0) 
      mouseX = (mouseX < document.body.clientWidth/2) ? mouseX+=5 : 
        (mouseX > document.body.clientWidth/2) ? mouseX-=5 :
        mouseX;
    else
      mouseX = (Math.abs(currentMouseX - mouseX) < 10) ? currentMouseX :
        (currentMouseX - mouseX < 0) ? mouseX-=5 : mouseX+=5; 

    distanceFrom = window.pageYOffset;

    draw[0](1-speed*1.5,mouseX/document.body.clientWidth+0.5);
    draw[1]();

    requestAnimationFrame(animate);
  });
 }

 



