setTimeout(function() {
	document.body.classList.remove("hidecontent");
}, 50);

setTimeout(function() {
	document.getElementById('sign').classList.remove("hidecontent");
}, 1000);

setTimeout(function() {
	document.getElementById('skobkiLeft').classList.add('blink');
	document.getElementById('skobkiRight').classList.add('blink');
}, 4000);

skobkiLeft.onmouseover = skobkiRight.onmouseover = handlerOver;
skobkiLeft.onmouseout = skobkiRight.onmouseout = handlerOut;


function handlerOver(event) {
	document.getElementById('skobkiLeft').classList.remove('blink');
	document.getElementById('skobkiRight').classList.remove('blink');
}

function handlerOut(event) {
	document.getElementById('skobkiLeft').classList.add('blink');
	document.getElementById('skobkiRight').classList.add('blink');
}

var main = document.getElementById('background');
var icons = document.getElementById('icons');
var footer = document.querySelector('.footer');

function transitionOnScroll() {
	var scrolled = window.pageYOffset;

	main.style.transform = "translatey(" + scrolled / 5 + "px)";
	main.style.opacity = 1 - scrolled / 700;

	icons.style.opacity = 1 - scrolled / 100;

	if (scrolled >= 1) footer.style.zIndex = '0';
	else footer.style.zIndex = '10000';

	if (scrolled >= 100) icons.parentNode.style.display = 'none';
	else icons.parentNode.style.display = 'block';

	if (scrolled >= 500) getUp.style.display = 'block';
	else getUp.style.display = 'none';

	console.log(scrolled / document.documentElement.clientWidth);

	if (scrolled / document.documentElement.clientHeight >= 0.1) botMen.children[0].classList.add('visible');
	if (scrolled / document.documentElement.clientHeight >= 0.35) botMen.children[1].classList.add('visible');
	if (scrolled / document.documentElement.clientHeight >= 0.6) botMen.children[2].classList.add('visible');
	if (scrolled / document.documentElement.clientHeight >= 0.85) botMen.children[3].classList.add('visible');
}

var elem;

botMen.onmouseover = function(event) {
	if (event.target.classList.contains('razdel'))
		elem = event.target.firstElementChild.nextElementSibling;
	if (event.target.tagName == 'DIV')
		elem = event.target.nextElementSibling;
	if (event.target.tagName == 'P')
		elem = event.target.parentNode.parentNode.firstElementChild.nextElementSibling;

	if (elem == null) return;

	var pic = (elem.classList.contains('pic')) ? elem : elem.nextElementSibling;
	var cont = (elem.classList.contains('pic')) ? elem.nextElementSibling : elem;

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

	var pic = (elem.classList.contains('pic')) ? elem : elem.nextElementSibling;
	var cont = (elem.classList.contains('pic')) ? elem.nextElementSibling : elem;

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
	var elem = event.target.parentNode.parentNode;
	var target = event.target;
	if (elem.children.length < 5) {
		elem = elem.parentNode;
		target = target.parentNode;
	}
	for (var i = 0; i < elem.children.length - 5; i++) {
		console.log(elem.children[i]);
		console.log(target.parentNode);
		if (elem.children[i] != target.parentNode) {
			elem.children[i].classList.add('disable');
			elem.lastElementChild.classList.add('visible');
		} else {
			tempInfo = elem.children[i + 4];
			tempTop = elem.children[i];
			tempTop.classList.add('top');
			tempTop.addEventListener("transitionend", enable);
		}
	}

}
inf1.onclick = inf2.onclick = inf3.onclick = inf4.onclick = function(event) {
	event.stopPropagation();
}

inf1.onmouseover = inf2.onmouseover = inf3.onmouseover = inf4.onmouseover = function(event) {
	event.stopPropagation();
}

inf1.onmouseout = inf2.onmouseout = inf3.onmouseout = inf4.onmouseout = function(event) {
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
	//while(window.pageYOffset != 0){
	//	window.pageYOffset += 20;
	//}
	scrollOptions = {
    	top: 0,
    	behavior:'smooth' 
  	}
	window.scrollTo(scrollOptions);
	// return scrolltop();
	// var t; 
	// function scrolltop() { 
	// 	var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop); 
	// 	console.log(top);
	// 	if(top > 0) { 
	// 		window.scrollTo(0,1); 
	// 		t = setTimeout(scrolltop,30); 
	// 	} else { 
	// 		clearTimeout(t); 
	// 	} 
	// 	return false; 
	// }
}

var context = document.getElementById('transit').getContext('2d');

context.canvas.width = document.documentElement.clientWidth;
context.canvas.height = document.documentElement.clientHeight;

function line(x,y) {

   // context.fillStyle = 'rgba(0,0,0,0)';
   // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
   context.beginPath();
   context.moveTo(0, context.canvas.height);
   // context.lineTo(0, context.canvas.height*x.point);
   context.quadraticCurveTo((context.canvas.width/2)*y,
                         (context.canvas.height)*x,
                         context.canvas.width, context.canvas.height);
   // context.quadraticCurveTo(context.canvas.width/2,
   //                       context.canvas.height*x.coef,
   //                       context.canvas.width*2/3, context.canvas.height*x.secondPoint);
   // context.quadraticCurveTo(context.canvas.width*3/4,
   //                       context.canvas.height*x.secondCoef,
   //                       context.canvas.width, context.canvas.height*x.point);
   // context.lineTo(context.canvas.width, context.canvas.height);
   context.fillStyle = 'rgba(255,255,255,1)';
   context.fill();
 }

 function animate(draw){

  let timeFrom = performance.now();
  let distanceFrom = window.pageYOffset;
  let speed = 0;
  let currentMouseX = document.body.clientWidth/2;
  let mouseX = document.body.clientWidth/2;

  document.addEventListener('mousemove', (e) => {
      currentMouseX = e.clientX;
  });

  requestAnimationFrame(function animate(time) {
    let timeDifference = time - timeFrom;
    timeFrom = time;

    let currentSpeed = (window.pageYOffset - distanceFrom)/timeDifference;

    console.log('Speed = ' + speed + ' Current Speed = ' + currentSpeed);

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


    //speed = (window.pageYOffset - distanceFrom)/timeDifference;
    distanceFrom = window.pageYOffset;

    //console.log('Time - ' + timeDifference + ' Speed = ' + speed);

    // let progress = findParameters(window.pageYOffset/(1*document.body.clientHeight));
    // console.log('X = ' + window.pageYOffset/(1*document.body.clientHeight));
    console.log(mouseX/document.body.clientWidth+0.5);
    draw[0](1-speed*1.5,mouseX/document.body.clientWidth+0.5);
    draw[1]();
    requestAnimationFrame(animate);
  });
 }

 animate([line,transitionOnScroll]);



