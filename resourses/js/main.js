let tempInfo;
let tempTop;
let mainBlock 		= document.querySelector('.main_block');
let blurScreen 		= document.querySelector('.blurScreen');
let context 		= document.getElementById('transit').getContext('2d');
let wave			= {
	draw			: line,
	coeficients		: coefForWave
}
let updateScreen	= {
	draw			: transitionOnScroll,
	coeficients 	: (props) => { return {scrolled : props.currentDistance}; }
}
let animations 		= [wave,updateScreen];

animate(animations);

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
	},100);	
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
	scrollOptions = {
    	top: x = window.pageYOffset == 0 ? document.documentElement.clientHeight : 0,
    	behavior:'smooth' 
  	}
	window.scrollTo(scrollOptions);
}

function line(coefs) {
	context.canvas.width 	= document.documentElement.clientWidth;
	context.canvas.height 	= document.documentElement.clientHeight;

	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.beginPath();
	context.moveTo(0, context.canvas.height);
	context.quadraticCurveTo((context.canvas.width/2),
                         (context.canvas.height)*coefs.y,
                         context.canvas.width, context.canvas.height);
	context.fillStyle = 'rgba(255,255,255,1)';	context.fill();
 }

function coefForWave(props){
	if(props.previousSpeed != 0) transit.style.zIndex = 10;
	    else transit.style.zIndex = 3;

	if(props.previousSpeed - props.currentSpeed > 0) 
		props.previousSpeed = (Math.abs(props.previousSpeed - props.currentSpeed) <= 0.08) ? 
			(props.currentSpeed != 0) ? 
				props.currentSpeed : 
				props.previousSpeed -=0.009 : 
				props.previousSpeed -=0.009;
	else
		props.previousSpeed = (Math.abs(props.currentSpeed - props.previousSpeed) <= 0.05) ? 
			props.currentSpeed : props.previousSpeed +=0.03;

	// if(props.currentMouseX - props.previousMouseX === 0) 
	// 	props.previousMouseX = (props.previousMouseX < document.body.clientWidth/2) ? 
	// 		props.previousMouseX+=5 : (props.previousMouseX > document.body.clientWidth/2) ?
	// 			props.previousMouseX-=5 :props.previousMouseX;
	// else
	// 	props.previousMouseX = (Math.abs(props.currentMouseX - props.previousMouseX) < 10) ?
	// 		props.currentMouseX : (props.currentMouseX - props.previousMouseX < 0) ?
	// 			props.previousMouseX-=5 : props.previousMouseX+=5;

	return {
		y	: 1-props.previousSpeed,
		x	: props.previousMouseX/document.body.clientWidth+0.5
	}
}

function transitionOnScroll(coefs) {
	blurScreen.style.opacity = coefs.scrolled / 700; 

	if (coefs.scrolled >= 500){
		getUp.style.transform = 'rotateZ(-90deg)';
		getUp.style.color = '#564168';
	}
	else{ 
		getUp.style.transform = 'rotateZ(90deg)';
		getUp.style.color = 'white';
	}

	let coefOfScroll = coefs.scrolled / document.documentElement.clientHeight;

	if(coefOfScroll >= 0.2){
	 	mainBlock.style.filter = 'blur(2px)';
	 	mainBlock.style.zIndex = 1;
	}else{
	 	mainBlock.style.filter = 'blur(0px)';
	 	mainBlock.style.zIndex = 5;
	}
	if (coefOfScroll >= 0.1) botMen.children[0].classList.add('visible');
	if (coefOfScroll >= 0.35) botMen.children[1].classList.add('visible');
	if (coefOfScroll >= 0.6) botMen.children[2].classList.add('visible');
	if (coefOfScroll >= 0.85) botMen.children[3].classList.add('visible');
}

function animate(animation){

	let properties = {
		currentTime		: performance.now(),
		previousTime	: performance.now(),
		currentDistance	: window.pageYOffset,
		previousDistance: window.pageYOffset,
		currentSpeed	: 0,
		previousSpeed	: 0,
		currentMouseX	: document.body.clientWidth/2,
		previousMouseX	: document.body.clientWidth/2
	}

	document.addEventListener('mousemove', (e) => {
		properties.currentMouseX = e.clientX;
	});

	requestAnimationFrame(function animate(time) {
    	properties.currentTime		= time;
    	properties.currentDistance 	= window.pageYOffset;
    	properties.currentSpeed 	= (properties.currentDistance - properties.previousDistance)/(properties.currentTime-properties.previousTime);

    	animation.forEach((item,i,arr) => {
    		let coeficients = item.coeficients(properties);
    		item.draw(coeficients);
    	});

    	properties.previousTime = time;
    	properties.previousDistance = window.pageYOffset;    

	    requestAnimationFrame(animate);
	  });
 }