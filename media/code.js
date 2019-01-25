	var cvs = document.getElementById('game'),
	ctx = cvs.getContext('2d'),
	//scaling
	window_size = (innerWidth+innerHeight)/50,

	//initial stats
	health = 100,
	timeS = 0,
	timeM = 0,
	time = getSecondsToday(),
	killed = 0,

	//initial positions player
	xPos=innerWidth*0.08,
	yPos=innerHeight-200,

	//player controls
	left = false,
	right = false,

	//bg
	x=innerWidth,
	y=innerHeight-10,
	x_scroll=0,

	//enemy array
	enemies = [],

	//enemy scroll speed modif.
	scroll = false,


	//player animation
	player_animation = [{width:1293, height:1293, frames:18, state:null}],
	n=0,
	player_speed = 4.6,

	//zomb animation
	heightz = 85,
	widthz = 62,
	framesz = 7,
	nz=0,

	bg_game = new Image(),
	dog_sp = new Image(),
	player_walk = new Image(),
	player_idle = new Image(),
	enemy_zombie = new Image();


bg_game.src = 'layout/assets/img/bg-game.png';
dog_sp.src = 'character animation/enemies/dog/sprites/spritesheet2.png';
player_walk.src = 'character animation/knight/sprites/walk_sprite_FULLuwu.png';
player_idle.src = 'character animation/knight/sprites/idle/idle_sprite.png';
enemy_zombie.src = 'character animation/enemies/zomb_0.png';

//default player anims.
player_animation.state = player_idle;
player_animation.frames = 17;
player_animation.height = 1339;
player_animation.width = 1293;

document.addEventListener('keydown', js_event);
document.addEventListener('keyup', keyup_event);

function js_event(event){

	//literally walk
if (event.keyCode==65 || event.keyCode==68){
	player_animation.state = player_walk;
	player_animation.frames = 24;
	player_animation.height = 1293;
	player_animation.width = 1293;
};

switch (event.keyCode) {
	case 65:
		left = true;
		break;

	case 68:
		right = true;
		break;

	default:
		break;

};

};

function keyup_event(event){
	if (event.keyCode==65 || event.keyCode==68){
		n=0;
		player_animation.state = player_idle;
		player_animation.frames = 17;
		player_animation.height = 1339;
		player_animation.width = 1293;
		scroll = false;
	};


switch (event.keyCode) {
	case 65:
		left = false;
		break;

	case 68:
		right = false;
		break;

	default:
		break;

};

};

//time funcs
function getSecondsToday(){
	var now = new Date();

	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	var diff = now - today;

	if (Math.floor(diff / 1000)-time>=60){
		time+=60;
		timeM++;
	};

	return Math.floor(diff / 1000);
};

//<old>
function timer(){
	if (timeS<59){
		timeS++
	}else{
		timeS=0;
		timeM++;
	};
};
//</old>


//draw funcs
function player(xPos, yPos){

	ctx.drawImage(player_animation.state, 0, player_animation.height*n, player_animation.width, 1293, xPos, yPos, 117+window_size, 117+window_size);
	if (n>=player_animation.frames) {
		n=0;
	}else{
		n++;
	};

};

//old
function edog(xPosd1, yPosd1){

	ctx.drawImage(dog_sp, 0, heightd*nd, widthd, heightd, xPosd1, yPosd1, 100+window_size, 70+window_size);

	if (nd>=framesd) {
		nd=0;
	}else{
		nd++;
	};

	if (xPosd>0) {
		xPosd-=10;
	}else{
		xPosd=x;
	};
};
function zombie(xPosd1, yPosd1){

	ctx.drawImage(enemy_zombie, widthz*Math.round(nz), 0, widthz, heightz, xPosd1, yPosd1, 40+window_size, 70+window_size);

	if (nz>=framesz) {
		nz=0;
	}else{
		nz+=0.5;
	};

	if (xPosz>0) {
		xPosz-=5;
	}else{
		xPosz=x;
	};

};
//old


//spawn enemies
function spawnEnemies(name, xPos, yPos, height, width, frames, animSpeed, horiz, vertical, n, xScale, yScale, speed){
	enemies.push({name, xPos, yPos,
		height, width, frames, animSpeed, horiz, vertical, n, xScale, yScale, speed});
};

function spawnLogic(){
	//name, xPos, yPos, height, width, frames, animSpeed, horiz, vertical, n, xScale, yScale, speed
	spawnEnemies(dog_sp, randomInt(0, innerWidth), innerHeight*0.82, 85.25, 125, 7, 1, 0, 1, 0, 100, 80, 12);
	setTimeout(spawnLogic, randomInt(100, 1000));
};

//random integer
function randomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function main (){
	//draw
	ctx.drawImage(bg_game, x_scroll, bg_game.height-y, x, y, 0, 0, x, y);
	player(xPos, yPos);

	//enemy draw
	for (var i = 0; i < enemies.length; i++) {
		if (enemies.length!=0 || enemies.length!=undefined){

			ctx.drawImage(enemies[i].name, enemies[i].width*(Math.round(enemies[i].n)*enemies[i].horiz),
			enemies[i].height*(Math.round(enemies[i].n)*enemies[i].vertical), enemies[i].width, enemies[i].height,
			enemies[i].xPos, enemies[i].yPos, enemies[i].xScale, enemies[i].yScale);

			enemies[i].xPos-=enemies[i].speed;

			if (scroll == true){
				if (right == true){
					enemies[i].xPos-=player_speed;
				};

				if (left == true){
					enemies[i].xPos+=player_speed;
				};
			};

			if (enemies[i].n>=enemies[i].frames) {
				enemies[i].n=0;
			}else{
				enemies[i].n+=enemies[i].animSpeed;
			};

			if (enemies[i].xPos+enemies[i].name.width<=0){
				enemies.splice(i--, 1);
			};



		};

	};

	//health
	ctx.fillStyle = '#FF0000';
	ctx.fillRect(20, 20, health/0.5, 18);

	//text
	//health
	ctx.font = '20px Georgia';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(health, health-4, 34);

	//controls
	if (left==true){
		if(xPos>x/2-120+window_size-50 || x_scroll<=0){
			xPos-=player_speed;
			scroll = false;
		}else{
			x_scroll-=player_speed;
			scroll = true;
		};
	};

	if (right==true){
		if(xPos<x/2-120+window_size || (x_scroll+x)>=bg_game.width){
			xPos+=player_speed;
			scroll = false;
		}else{
			x_scroll+=player_speed;
			scroll = true;
		};
	};

	//timer tex t asdasd
	ctx.font = '18px Georgia';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText('Time:', 10, innerHeight-35);
	ctx.fillText(`${timeM}:${(getSecondsToday()-time)}`, 60, innerHeight-35);

	ctx.fillText(`Killed: ${killed}`, 10, innerHeight-55);




};

setInterval(main, 60);
setInterval(getSecondsToday, 100);
setTimeout(spawnLogic, 100);
