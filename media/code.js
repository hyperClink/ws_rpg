var cvs = document.getElementById('game'),
	ctx = cvs.getContext('2d'),
	//scaling
	window_size = (innerWidth+innerHeight)/50,

	//initial stats
	health = 100,
	timeS = 0,
	timeM = 0,
	killed = 0,

	//initial positions player
	xPos=innerWidth*0.08,
	yPos=innerHeight-200,

	//bg
	x=innerWidth;
	y=innerHeight-10,
	x_scroll=0;

	//dog
	xPosd=innerWidth,
	yPosd=innerHeight-170,

	//player animation
	player_animation = [{width:1293, height:1293, frames:18, state:null}],
	n=0,

	//dog animation
	heightd = 85,
	widthd = 125,
	framesd = 7,
	nd=0,

	bg_game = new Image(),
	dog_sp = new Image(),
	player_walk = new Image(),
	player_idle = new Image();

bg_game.src = 'layout/assets/img/bg-game.png';
dog_sp.src = 'character animation/enemies/dog/sprites/spritesheet2.png';
player_walk.src = 'character animation/knight/sprites/walk_sprite_FULLuwu.png';
player_idle.src = 'character animation/knight/sprites/idle/idle_sprite.png';

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

if (event.keyCode==65){

	if(xPos>x/2-120+window_size-50 || x_scroll<=0){
		xPos-=2.4;
	}else{
		x_scroll-=2.4;
	};

};

if (event.keyCode==68){

	if(xPos<x/2-120+window_size || (x_scroll+x)>=bg_game.width){
		xPos+=2.4;
	}else{
		x_scroll+=2.4;
	};

};

};

function keyup_event(event){
	if (event.keyCode==65 || event.keyCode==68){
		n=0;
		player_animation.state = player_idle;
		player_animation.frames = 17;
		player_animation.height = 1339;
		player_animation.width = 1293;
	};

};

 	function player(xPos, yPos){

	ctx.drawImage(player_animation.state, 0, player_animation.height*n, player_animation.width, 1293, xPos, yPos, 117+window_size, 117+window_size);
	if (n>=player_animation.frames) {
		n=0;
	}else{
		n++;
	};

};


function edog(xPosd1, yPosd1){

	ctx.drawImage(dog_sp, 0, heightd*nd, widthd, heightd, xPosd1, yPosd1, 100+window_size, 70+window_size);

	if (nd==framesd) {
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

function main (){
	ctx.drawImage(bg_game, x_scroll, bg_game.height-y, x, y, 0, 0, x, y);
	player(xPos, yPos);
	edog(xPosd, yPosd);

	//health
	ctx.fillStyle = '#FF0000';
	ctx.fillRect(20, 20, health/0.5, 18);

	//text
	//health
	ctx.font = '20px Georgia';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(health, health-4, 34);

	//timer

	//timer
	ctx.font = '18px Georgia';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText('Time:', 10, innerHeight-35);
	ctx.fillText(timeM+':'+timeS, 60, innerHeight-35);

	ctx.fillText('Killed:', 10, innerHeight-55);
	ctx.fillText(killed, 65, innerHeight-55);

};

function timer(){
	if (timeS<59){
		timeS++
	}else{
		timeS=0;
		timeM++;
	};
};

setInterval(main, 68);
setInterval(timer, 1000);
