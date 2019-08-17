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

window.onscroll = function() {
	var scrolled = window.pageYOffset;

	main.style.transform = "translatey(" + scrolled / 2.5 + "px)";
	main.style.opacity = 1 - scrolled / 700;

	icons.style.opacity = 1 - scrolled / 100;

	if (scrolled >= 100) icons.parentNode.style.display = 'none';
	else icons.parentNode.style.display = 'block';

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

