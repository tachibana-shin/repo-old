/*!
 * scroll-anime.js v0.2
 * (c) 2019 Shinigami
 * Released under the MIT License.
 */
!function (global, factory) {
"use strict"
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = global.document ? factory(global) : function (w) {
	if (!w.document)
		throw new Error("myjs requires a window with a document");
	return factory( w )
} : typeof define === 'function' && define.amd ? define(factory) :
	window.scrollAnime = factory(global)
}(this, function () {
"use strict"
if (Function.prototype.bind !== "function")
	Function.prototype.bind = function (e) {
    	var fn = this
    	return function () {
			fn.apply(e, arguments)
		}
	}
function GTB () {
	this.top = 0;
	this.lastFrame = 0;
	//this.animateScroll = this.animateScroll.bind(this)
	
	this.scrollTo = function (elem, $fps) {
		this.top = GTB.offset(elem).top// + pageYOffset;
		var bodyH = document.body
				.clientHeight
		if(bodyH - this.top < GTB.wh)
			this.top = bodyH - GTB.wh;
		this.lastFrame = Date.now();
		GTB.loop(function () {this.ANIME($fps)}.bind(this))
		
	}
	this.ANIME = function ($fps) {
		var now = Date.now();
		var fps = 1000 / (now - this.lastFrame);
		this.lastFrame = now;
		
		var adjustor = fps/$fps
		var framePos = 
this.top > pageYOffset ? 
pageYOffset +
Math.ceil(
	(this.top - pageYOffset) / 
	(15 * adjustor)
)
 : 
pageYOffset + 
Math.floor(
	(this.top - pageYOffset) /
	(15 * adjustor)
)

		window.scrollTo(0, framePos);

		if(Math.abs(pageYOffset - this.top) > 1)
			GTB.loop(function () {this.ANIME($fps)}.bind(this))
		else
			window.scrollTo(0, this.top);
	}.bind(this)
}

GTB.offset = function (elem) {

var rect, win, args = arguments, x, y;

if ( !elem.getClientRects().length )
	return { top: 0, left: 0 };

rect = elem.getBoundingClientRect();
win = elem.ownerDocument.defaultView;
return {
	top: rect.top + win.pageYOffset,
	left: rect.left + win.pageXOffset,
	width: elem.offsetWidth,
	height: elem.offsetHeight
};
}

Object.defineProperty(GTB, "wh", {
    get: function () {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
})
GTB.loop = (window.requestAnimationFrame || 		window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame || 
	window.msRequestAnimationFrame || 
	window.oRequestAnimationFrame || 
	function (e) {
		window.setTimeout(e, 100/6)
	}).bind(window)
	
GTB.getAttr = function (e, f) {
    return e.getAttribute(f)
}
GTB.numberic = function (e, d) {
    return typeof e === 'number' || (typeof e === 'string' && !Number.isNaN(e - 0)) ? e - 0 : (d - 0)
}
function reload () {
var es = document.querySelectorAll("*[data-goto]")

var length = es.length, index = 0;
var ES = new GTB
for (; index < length; index++) {

	function fn () {
	    ES.scrollTo(
			document.querySelector(
				GTB.getAttr(
					this,
					"data-goto"
				)
			),
			GTB.numberic(
				GTB.getAttr(
					this,
					"data-fps"
				),
				60
			)
		)
		
	}
	
	es[index]
	.addEventListener("click", fn)
	
}
}

function loadDone () {
window.removeEventListener('load', loadDone)
document.removeEventListener('DOMContentLoaded', loadDone)
reload()
}
if(document.readyState === 'complete')
	reload()
else {
window.addEventListener('load', loadDone)
document.addEventListener('DOMContentLoaded', loadDone)
}
return reload.bind(window)
})
