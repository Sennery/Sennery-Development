function Game1(){
	let enabled = true;

	let canvas = document.querySelector('.gameCanvas');
    let context = canvas.getContext("2d");

    canvas.width 	= 320;
	canvas.height 	= 320;

    let player = {    	
    	sizeX 		: 50,
    	sizeY 		: 50,
    	positionX 	: 0,
    	positionY 	: 0,
    	speed 		: 25,
    	color 		: 'black'
    };

    let enemyProperties = {
    	sizeX 		: 50,
    	sizeY 		: 50,
    	count 		: 3,
    	speed 		: 6,
    	acceleration: 1,
    	color 		: 'red'
    };

    let startPosition = canvas.width/2 - player.sizeX/2;

    let enemies = [];

	document.body.style = 'overflow-y: hidden;';

	document.addEventListener('keydown', function(event) {
  		switch (event.code) {
  			case 'ArrowLeft':
    			player.positionX -= ((player.positionX - player.speed) >= 0) ? player.speed : player.positionX;
    			console.log(player.positionX);
    			break;
  			case 'ArrowRight':
    			player.positionX += ((player.positionX + player.speed) <= (canvas.width-player.sizeX)) 
    				? player.speed : (canvas.width - player.sizeX- player.positionX);
    			console.log(player.positionX);
    			break;
  			case 'ArrowUp':
    			player.positionY -= ((player.positionY - player.speed) >= 0) ? player.speed : player.positionY;
    			console.log(player.positionY);
    			break;
  			case 'ArrowDown':
    			player.positionY += ((player.positionY + player.speed) <= (canvas.height-player.sizeY)) 
    				? player.speed : (canvas.height - player.sizeY- player.positionY);
    			console.log(player.positionY);
    			break;
  			default:
    			// alert( "Нет таких значений" );
		}
	});

	class Enemy{
		constructor(){
			this.x = Math.random()*canvas.width;
            this.y = canvas.height;
            this.s = Math.random()*enemyProperties.speed;
            console.log(this.x);
            console.log(this.y);
		}

		draw(){
			context.fillStyle = enemyProperties.color;
			context.fillRect(this.x,this.y,enemyProperties.sizeX, enemyProperties.sizeY);
		}

		position(){
			this.s += enemyProperties.acceleration/1000;
			this.y -= this.s;
		}

		check(){
			if	(((this.x + enemyProperties.sizeX <= player.positionX + player.sizeX) 
				&& (this.x + enemyProperties.sizeX >= player.positionX) 
				|| (this.x <= player.positionX + player.sizeX) 
				&& (this.x >= player.positionX))
				&& ((this.y + enemyProperties.sizeY <= player.positionY + player.sizeY) 
				&& (this.y + enemyProperties.sizeY >= player.positionY) 
				|| (this.y <= player.positionY + player.sizeY) 
				&& (this.y >= player.positionY))){
				// alert('Looser');
				// refillEnemies();
				enabled = false;
			}

			if (this.y + enemyProperties.sizeY <= 0){
				this.x = Math.random()*canvas.width;
            	this.y = canvas.height;
			}
		}
	};

	function refillEnemies(){
		enemies = [];
		for ( let i = 1 ; i <= enemyProperties.count; i++){
			enemies.push(new Enemy);
		};
		player.positionX = startPosition;
		player.positionY = 0;
	}

	function draw(){
		context.fillStyle = "#AAA";
		context.fillRect(0,0,canvas.width, canvas.height);
		drawPlayer();
		for(let x in enemies){
			enemies[x].position();
			enemies[x].draw();
			enemies[x].check();
		}
		if(enabled == true) requestAnimationFrame(draw);
		else {
			document.body.style = 'overflow-y: auto;';
			return;
		}
	};

	function drawPlayer(){
		context.fillStyle = player.color;
		context.fillRect(player.positionX,player.positionY,player.sizeX, player.sizeY);	
	};	

	function init(){
		console.log('hyuuuuuui');
		player.positionX = startPosition;
		for ( let i = 1 ; i <= enemyProperties.count; i++){
			enemies.push(new Enemy);
		}
		draw();
	};

	init();
}