
function tym(){
	this.x = rand(ww)
	this.y = rand(wh)
	this.z = rand(wh)
	this.c = rand(300)
	this.s = 2
	this.draw = function () {
		var k = ww / this.z
		var x = (this.x - ww/2) * k + ww/2
		var y = (this.y - wh/2) * k + wh/2
		begin()
			arc(x, y, this.r, 90, 270)
			lineWidth(this.r * 2)
			lineCap('round')
			stroke('hsl(' + this.c + ', 100%, 50%)')
		close()
	}
	this.update = function () {	
		this.draw()
		this.z += this.s
		this.r = ww / this.z * 1.5
	  if(this.z > wh) this.z = 1;
	}
}
var tyms = []
for(var i = 0; i < wh; i++)
		tyms.push(new tym());
function honkai (){
clear()
background(0)
	tyms.forEach(function (d) {
		d.update()
	})
loop()
}
