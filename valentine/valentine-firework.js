
function honkai () {
var listFire = [];
var listFirework = [];
var fireNumber = 15
var center = {
	x: cw / 2,
	y: ch / 2
}
var range = 100;
for (var i = 0; i < fireNumber; i++) {

var fire = {
	x: rand(range / 2) - range / 4 + center.x,
	y: rand(range * 2) + ch,
	size: rand(1) + 0.5,
	fill: '#fd1',
	vx: rand(1) - 0.5,
	vy: -(rand(1) + 4),
	ax: rand(0.02) - 0.01,
	far: rand(range) + (center.y - range)
}
	fire.base = {
		x: fire.x,
		y: fire.y,
		vx: fire.vx
	}
listFire.push(fire);
}

!function () {
	loop()
	update();
	draw();
}()

function update() {
	for (var i = 0; i < listFire.length; i++) {
		var fire = listFire[i]
		
		if (fire.y <= fire.far) {
			var color = randColor();

			for (var i = 0; i < fireNumber * 5; i++) {

				var firework = {
					x: fire.x,
					y: fire.y,
					size: rand(1) + 1.5,
					fill: color,
					vx: rand(5) - 2.5,
					vy: rand(-5) + 1.5,
					ay: 0.05,
					alpha: 1,
					life: round(rand(range / 2)) + range / 2
				}

				firework.base = {
					life: firework.life,
					size: firework.size
				}

		listFirework.push(firework);
			}

			fire.y = fire.base.y;
			fire.x = fire.base.x;
			fire.vx = fire.base.vx;
			fire.ax = rand(0.02) - 0.01;
		}
		fire.x += fire.vx;
		fire.y += fire.vy;
		fire.vx += fire.ax;
	}

	for (var i = listFirework.length - 1; i >= 0; i--) {
		var firework = listFirework[i];

		if (firework) {
firework.x += firework.vx;
firework.y += firework.vy;
firework.vy += firework.ay;
firework.alpha = firework.life / firework.base.life;
firework.size = firework.alpha * firework.base.size;
firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
firework.life--;
			if (firework.life <= 0)
		  listFirework.splice(i, 1);
		}
	}
}


function draw() {
globalOperation('source-over')
globalAlpha(0.18)
background('#000')
globalOperation('screen')
globalAlpha(1)

for (var i = 0; i < listFire.length; i++) {
	var fire = listFire[i];
	begin()
		circle(fire.x, fire.y, fire.size)
		fill(fire.fill)
	close()
}

for (var i = 0; i < listFirework.length; i++) {
	var firework = listFirework[i];
	globalAlpha(firework.alpha)
	begin()
		circle(firework.x, firework.y, firework.size)
		fill(firework.fill)
	close()
}

}
}
