function matrix3d (x, y, z) {
    isArr(x) && (
    	z = x[2],
    	y = x[1],
    	x = x[0]
    )
    this.X = x
    this.Y = y
    this.Z = z
}
matrix3d.sin = function (e) {
    return Math.sin(e * (this.mode === 'RADIAN' ? 1 : pi/180))
}
matrix3d.cos = function (e) {
    return Math.cos(e * (this.mode === 'RADIAN' ? 1 : pi/180))
}
matrix3d.prototype = {
    rotateX: function (e) {
        var sin = matrix3d.sin(e)
        var cos = matrix3d.cos(e)
        var y = this.Y
        var z = this.Z
        this.Y = y * cos - z * sin
        this.Z = z * cos + y * sin
        return this
    },
    rotateY: function (e) {
        var sin = matrix3d.sin(e)
        var cos = matrix3d.cos(e)
        var x = this.X
        var z = this.Z
        this.X = x * cos - z * sin
        this.Z = z * cos + x * sin
        return this
    },
    rotateZ: function (e) {
        var sin = matrix3d.sin(e)
        var cos = matrix3d.cos(e)
        var x = this.X
        var y = this.Y
        this.X = x * cos - y * sin
        this.Y = y * cos + x * sin
        return this
    },
    rotate: function (x, y, z) {
        if(arguments.length === 1)
        	return this.rotateX(x)
        		.rotateY(x)
        		.rotateZ(x);
        return this.rotateX(x)
        	.rotateY(y)
        	.rotateZ(z)
    },
    scaleX: function (e) {
        this.X *= e
        return this
    },
    scaleY: function (e) {
        this.Y *= e
        return this
    },
    scaleZ: function (e) {
        this.Z *= e
        return this
    },
    scale: function (x, y, z) {
        if(arguments.length === 1)
        	return this.scaleX(x)
        		.scaleY(x)
        		.scaleZ(x);
        return this.scaleX(x)
        	.scaleY(y)
        	.scaleZ(z)
    },
    translateX: function (e) {
        this.X += e
        return this
    },
    translateY: function (e) {
        this.Y += e
        return this
    },
    translateZ: function (e) {
        this.Z += e
        return this
    },
    constructor: matrix3d
}
