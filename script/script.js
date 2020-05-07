
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

// Выбор окружения

window.onload = defaultGame;
document.getElementById('startScreen').addEventListener("click", defaultGame);

function defaultGame() {
	bird.src = 'img/scene01/bird.gif';
	bg.src = 'img/scene01/bg.png';
	fg.src = 'img/scene01/fg.png';
	pipeUp.src = 'img/scene01/pipeUp.png';
	pipeBottom.src = 'img/scene01/pipeBottom.png';
}


//Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var kick = new Audio()

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';
kick.src = 'audio/kick.mp3';

var gap = 100; //Расстояние между трубами по Y

// При нажатии на какую-либо кнопку
var jump = document.getElementById("Jump");
jump.addEventListener("click", moveUp);

document.addEventListener('keydown', direction);

function direction(event) {
	if(event.keyCode == 38) {
		yPos -= 40; //Высота прышка птичкиw
	}
}

function moveUp() {
	yPos -= 40; //Высота прышка птичкиw
}

// Создание блоков
var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

var score = 0;

// Позиция птички
var xPos = 10;
var yPos = 200;
var grav = 3; //Скорость падения птички

//Начало игры
var startGame = document.getElementById('button-start');
var restartGame = document.getElementById('buttonRestart');

startGame.onclick = function draw() {
	startGame.classList.add('close');
	Jump.classList.remove('close');
	startScreen.classList.add('close');
	changeGame.classList.add('close');

	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x -= 2; //Скорость полёта птички

		if(pipe[i].x == 50) { //Расстояние между трубами по X
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}

		if(cvs.width - pipe[i].x == 0) {
				pipe.shift({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height - pipeUp.height),
			});
		}

		if(xPos + bird.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {

			Jump.classList.add('close');
			modalEnd.classList.remove('close');
			document.getElementById('score').innerHTML = "Your score: " + score;
			kick.play();
			startGame = function lose() {

			}

		}

		if(yPos + bird.height >= cvs.height - fg.height) {
			grav = 0;
		} else {
			grav = 3; ///Скорость падения птички
		}

		if(pipe[i].x == 10) {
			score++;
			score_audio.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;

	ctx.fillStyle = '#000';
	ctx.font = '25px Verdana';
	ctx.fillText('Score: ' + score, 10, 30);
	requestAnimationFrame(draw);
}

buttonRestart.onclick = function lose() {
	location.reload();
}

// pipeBottom.onload = draw;

document.getElementById('updateButton').onclick = function Upload() {
	updateButton.classList.toggle('active');
	update.classList.toggle('active');
}
