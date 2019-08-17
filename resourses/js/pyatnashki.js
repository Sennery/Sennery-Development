function Game(){
	var field = [
			[1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,0]
	];
	var victory = [
			[1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,0]
	];;

	var canvas = document.getElementById('pyatnashki_canvas');

	canvas.width = 320;
	canvas.height = 320;

	var cellSize = canvas.width/4;
	var clicks =  0;

	context = canvas.getContext("2d");

	initializ();

	function drawCell(x, y){
		context.fillStyle = "#5c5c5c";
	    context.fillRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);
	}
	
	function drawNum(num, x , y){
		context.font =(cellSize/2)+"px Sans";
    	context.textAlign = "center";
    	context.textBaseline = "middle";
    	context.fillStyle = "#FFF";
    	context.fillText(num, x*cellSize + cellSize/2, y*cellSize + cellSize/2);
	}

	function initializ(){
		mix(200);
		draw();
		console.log(victory);
	}

	canvas.onclick = function(e){
			// alert(e.clientX);
			// alert(e.clientY);
			// alert(canvas.getBoundingClientRect().left);
			// alert(canvas.getBoundingClientRect().top);
		var x = (e.clientX - canvas.getBoundingClientRect().left) / cellSize | 0;
		var y = (e.clientY - canvas.getBoundingClientRect().top)  / cellSize | 0;
		move(x, y);
		draw();

		if(isVictory()){
			alert("Win for " + getClicks() + " clicks");
			mix(300);
			draw();
		}
	}

	function draw(){
		context.fillStyle = "#FFF";
		context.fillRect(0,0,canvas.width, canvas.height);
		for (var i = 0; i<4; i++){
			for (var j=0; j<4; j++){
				if(field[i][j] > 0){
					drawCell(j, i);
					drawNum(field[i][j], j, i);
				}
			}
		}
	}

	function move(x, y) {
		var nullX = getNullCell().x;
		var nullY = getNullCell().y;
		if (((x - 1 == nullX || x + 1 == nullX) && y == nullY) || ((y - 1 == nullY || y + 1 == nullY) && x == nullX)) {
			field[nullY][nullX] = field[y][x];
			field[y][x] = 0;
			clicks++;
		}
	}

	function isVictory(){
		var vic = true;
		console.log(field);
		console.log(victory);
		for (var i = 0; i<4; i++){
			for (var j=0; j<4; j++){
				if(field[i][j] != victory[i][j]){
					vic = false;
				}
			}
		}
		return vic;
	}

	function mix(stepCount) {
		console.log(stepCount);
		var x,y;
		for (var i = 0; i < stepCount; i++) {
			var nullX = getNullCell().x;
			var nullY = getNullCell().y;
			var hMove = getRandomBool();
			var upLeft = getRandomBool();
			if (!hMove && !upLeft) { y = nullY; x = nullX - 1;}
			if (hMove && !upLeft)  { x = nullX; y = nullY + 1;}
			if (!hMove && upLeft)  { y = nullY; x = nullX + 1;}
			if (hMove && upLeft)   { x = nullX; y = nullY - 1;}
			if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
				move(x, y);
			}
		}
		clicks = 0;
	}

	function getNullCell(){
		for (var j = 0; j<4; j++){
			for (var i=0; i<4; i++){
				if(field[j][i] === 0){
					return {'x': i, 'y': j};
				}
			}
		}
	}

	function getRandomBool() {
		if (Math.floor(Math.random() * 2) === 0) {
			return true;
		}
	}

	function getClicks(){
		return clicks;
	}

}

function user(name){
	var surname = "Hey " + name;

	this.retName = function(){
		alert( surname);
	}
}