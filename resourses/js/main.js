let tempInfo;
let tempTop;
let mainBlock 		= document.querySelector('.main_block');
let preloader 		= document.querySelector('.preloader');
let blurScreen 		= document.querySelector('.blurScreen');
let context 		= document.getElementById('transit').getContext('2d');
let wave			= {
	draw			: line,
	coeficients		: coefForWave
}
let animations 		= [wave];
let isPreloader = 1;

// animate(animations);

window.onload = function(){	
	setTimeout(()=>{
		scrollOptions = {
	    	 top: 0 
	  	}
		window.scrollTo(scrollOptions);

		let properties = {
			currentTime		: performance.now(),
			previousTime	: performance.now(),
			currentDistance	: 0,
			previousDistance: document.documentElement.clientHeight
		};

		function animatePreloader(time) {
			properties.currentTime		= time;

			wave.draw(wave.coeficients(properties));

			if(properties.previousDistance != 0) {
				requestAnimationFrame(animatePreloader);
			}
			else {
				isPreloader = 0.2;
				animate(animations);
			}
			properties.previousTime = time;
		};

		preloader.style.display = 'none';
		animatePreloader();
	},200);	
}

botMen.onmouseover = botMen.onmouseout = (event) =>{
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

	if(event.type === 'mouseover'){
		pic.firstElementChild.classList.add('picIncr');
		cont.firstElementChild.classList.add('contBright');
		elem.previousElementSibling.classList.add('zatemOn');
	} else if (event.type === 'mouseout'){
		pic.firstElementChild.classList.remove('picIncr');
		cont.firstElementChild.classList.remove('contBright');
		elem.previousElementSibling.classList.remove('zatemOn');
	}
}

botMen.onclick = function(event) {
	if(event.target.id === 'krest') return;

	let elem 	= event.target.parentNode.parentNode;
	let target 	= event.target;

	if (elem.children.length < 5) {
		elem 	= elem.parentNode;
		target 	= target.parentNode;
	}

	for (let i = 0; i < elem.children.length - 5; i++) {
		if (elem.children[i] != target.parentNode) {
			elem.children[i].classList.add('disable');
			elem.lastElementChild.classList.add('visible');
		} else {
			tempInfo 	= elem.children[i + 4];
			tempTop 	= elem.children[i];
			tempTop.classList.add('top');
			tempInfo.classList.remove('disable');
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
	let elem = event.target.parentNode;

	tempInfo.classList.add('disable');
	tempInfo = null;

	for (let i = 0; i < elem.children.length - 5; i++) {
		elem.children[i].classList.remove('disable');
		elem.children[i].classList.remove('top');
		event.target.classList.remove('visible');
	}
}

let game;

pyatnashki_h1.onclick = function() {	
	game = new Game();
}

shooter_h1.onclick = function()	{
	game = new Game1();	
}

getUp.onclick = function(event){
	if (window.pageYOffset == 0){
		getUp.style.transform = 'rotateZ(-90deg)';
		getUp.style.color = '#564168';
		document.querySelector('.footer').style.zIndex = 5;
	}
	else{ 
		getUp.style.transform = 'rotateZ(90deg)';
		getUp.style.color = 'white';
		document.querySelector('.footer').style.zIndex = 7;
	}	
	scroll();
}

function scroll(upMode){
	scrollOptions = {
    	top: x = window.pageYOffset == 0 ? window.innerHeight : 0,
    	behavior:'smooth' 
  	}
  	if(upMode != undefined)
	  	if(upMode == true) scrollOptions.top = 0;
	  	else if (upMode == false) scrollOptions.top = window.innerHeight;

	window.scrollTo(scrollOptions);
}

function line(coefs) {
	context.canvas.width 	= document.documentElement.clientWidth;
	context.canvas.height 	= document.documentElement.clientHeight;

	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.beginPath();
	context.moveTo(0, context.canvas.height);
	for(let i = 0; i <= context.canvas.width; i++) {
		context.lineTo(i, context.canvas.height - Math.sin((i+coefs.posXCoef)/coefs.freqCoef)*coefs.sizeCoef - coefs.posYCoef);
	}
	context.lineTo(context.canvas.width, context.canvas.height);
	context.fillStyle = 'rgba(255,255,255,1)';	context.fill();
 }

function coefForWave(props){
	if(props.currentDistance > props.previousDistance) { 
		props.previousDistance = (props.currentDistance - props.previousDistance <= 50) ? props.currentDistance : props.previousDistance + 50;
	}else if(props.currentDistance < props.previousDistance) { 
		props.previousDistance = (props.previousDistance - props.currentDistance <= 1) ? 
			props.currentDistance : props.previousDistance - 20*(Math.sqrt(props.previousDistance/document.documentElement.clientHeight));
	};
	
	return {
		posXCoef : Math.sin(props.currentTime/1000 - 3) * 10 + 150,
		freqCoef : document.documentElement.clientWidth/25 + 25,
		sizeCoef : Math.sin(props.previousDistance/document.documentElement.clientHeight * Math.PI) * 50  +  Math.sin(props.currentTime/1000) * 10,
		posYCoef : props.previousDistance * isPreloader + 20
	}
}

function animate(animation){

	let properties = {
		currentTime		: performance.now(),
		previousTime	: performance.now(),
		currentDistance	: window.pageYOffset,
		previousDistance: window.pageYOffset
	}

	requestAnimationFrame(function animate(time) {
    	properties.currentTime		= time;
    	properties.currentDistance 	= window.pageYOffset;

    	animation.forEach((item,i,arr) => {
    		let coeficients = item.coeficients(properties);
    		item.draw(coeficients);
    	});

    	properties.previousTime = time;

	    requestAnimationFrame(animate);
	  });
 }

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var gesuredZone = document.body;

gesuredZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gesuredZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesure();
}, false); 

function handleGesure() {
    var swiped = 'swiped: ';
    if( touchstartY - touchendY > 200) scroll(false);
    if( touchendY - touchstartY > 200) scroll(true);
}