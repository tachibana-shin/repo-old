!function (root) {
var my = root.my
if(typeof my !== 'function')
	throw 'myJS no install';
"use strict"
var url = 'http://www.w3.org/2000/svg'
function setAttr (e, key, val, v) {
    e.setAttributeNS(v, key, val)
}
function createXML (name) {
    return document.createElementNS(url, name)
}
function SVG (e) {
    var svg = createXML('svg')
    for(var i in e)
    	setAttr(svg, i, e[i]);
    this.SVG = svg
    my('body').append(svg)
    var result = new propsXML(svg)
    result.viewbox = function (e) {
        setAttr(svg, 'viewBox', e)
        return this
    }
    return result
}
function propsXML (e) {
    this.Root = e
}
propsXML.prototype = {
    offset: function (e, f) {
        e !== undefined && this.x(e)
        f !== undefined && this.y(f)
        return this
    },
    parent: function () {
        return new propsXML(this.Root.parentNode)
    },
    rect: function (w, h) {
        var e = this.append('rect')
        var f = new propsXML(e)
        return f.width(w)
        .height(h)
    },
    append: function (e) {
        var e = createXML(e)
        this.Root.appendChild(e)
        return e
    },
    line: function (x, y, x2, y2) {
        var e = this.append('line')
        return new propsXML(e)
        	.x1(x).y1(y)
        	.x2(x2).y2(y2)
    },
    goto: function (x, y) {
		return this.attr({
   			x: x,
   			y: y
		})
},
    circle: function (a, b, c) {
    var e = this.append('circle')
    	return new propsXML(e).cx(a)
    		.cy(b)
    		.r(c)
	},
	attr: function (e, f) {
	var that = this
	    isObj(e) ? my.each(e, function(i, e) {
    that.attr(i, e)
}) : setAttr(this.Root, e, f)
	    return this
	},
	group: function (e) {
	    var r = this.append('g')
	    return new propsXML(r)
	    			.id(e)
	},
	defs: function () {
	    var e = this.append('defs')
	    return new propsXML(e)
	},
	use: function (f) {
	    var e = this.append('use')
	    setAttr(e, 'xlink:href', f, 'http://www.w3.org/1999/xlink')
	    return new propsXML(e)
	},
	closest: function (e) {
	    return new propsXML(my(this.Root).closest(e).me)
	},
	back: function () {
	    return new propsXML(my(this.Root).closest('svg').me)
	},
	select: function (e) {
	    return new propsXML(this.Root.querySelector(e))
	},
	points: function (e) {
	  return this.attr('points', e)
	},
	ellipse: function (x, y, rx, ry) {
    	return new propsXML(this.append('ellipse'))
			.offset(x, y)
			.rx(rx).ry(ry)
	},
	polyline: function (e) {
	    return new propsXML(
	    	this.append('polyline')
	    )
	    .points(e)
	},
	polygon: function (e) {
	    return new propsXML(
	    	this.append('polygon')
	    )
	    .points(e)
	},
	path: function (d) {
	    return new propsXML(
	    	this.append('path')
	    )
	    .d(d)
	},
	text: function (e) {
	    if(isFunc(e)) {
	        e = e.call(this, function (e) {
var tspan = createXML('tspan')
tspan.appendChild(crText(e))
return tspan
})
this.Root.appendChild(e)
var v = new propsXML(e)
	    } else {
	         var text = this.append('text')
				text.appendChild(crText(e))
var v = new propsXML(text)
		}
		return v
	},
	tspan: function (e) {
	    if(this.Root.nodeName !== 'text') return;
		this.Root.innerHTML = ''
		this.append('tspan')
		.appendChild(crText(e))
		return this
	},
	linear: function (x, y, w, h) {
    	var e = this.append('linearGradient')
	return new propsXML(e)
			.x1(x).y1(y)
			.x2(w).y2(h)
	},
	style: function (k, v) {
	var that = this
	    if(isObj(k)) {
	        my.each(k, function (i, e) {
    that.Root.style[i] = e
})
	    }
	    else this.Root.style[k] = v;
	    return this
	},
	stop: function (offset, color, alpha) {
    return new propsXML(
    	this.append('stop')
    )
    .attr('offset', offset)
    .attr('stop-color', color)
    .attr('stop-opacity', alpha || 1),
    this
	},
	animate: function (e) {
	    return new propsXML(
	    	this.append('animate')
	    )
	    .attr(e), this
	},
	animateTransform: function (e) {
    	return new propsXML(
	    	this.append('animateTransform')
	    )
	    .attr(e), this
	}
}
	
my.each('width height x y x1 y1 x2 x2 r rx ry cx cy fill stroke stroke-width id fill-rule d'.split(' '), function (i, e) {
    propsXML.prototype[my.camelCase(e)] = function (f) {
    return this.attr(e, f)
}
})
root.SVG = SVG
}(this)
