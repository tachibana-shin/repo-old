/*!
 * skrollTop.js v0.1
 * (c) 2020 Shinigami
 * Released under the MIT License.
 */
!function ( global, factory ) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.skrollTop = factory(global));
}(this, function (window) {
"use strict";
var easings = {
  linear: function linear(t) {
    return t;
  },
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
var requestAnimationFrame = window.requestAnimationFrame || 		
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame || 
window.msRequestAnimationFrame || 
window.oRequestAnimationFrame || 
	function (e) {
		window.setTimeout(e, 100/6)
	}


var DOM = document,
    DOMe = DOM.documentElement;

function scrollIt(destination, duration, easing, callback) {

  if (easing === undefined)
  	easing = "easeInOutCubic"
  if (isNaN(duration - 0))
  	duration = 600
  else duration -= 0
  
  
  var start = window.pageYOffset;
  var body = DOM.body || DOM.getElementsByTagName("body")[0]
  var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  var DOMHeight = Math.max(body.scrollHeight, body.offsetHeight, DOMe.clientHeight, DOMe.scrollHeight, DOMe.offsetHeight);
  var windowHeight = window.innerHeight || DOMe.clientHeight || (body || { clientHeight: 0 }).clientHeight;
  
  var destinationOffsetToScroll = Math.round(DOMHeight - destination < windowHeight ? DOMHeight - windowHeight : destination);

  /*if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }*/

  function scroll() {
    var now = 'now' in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, ((now - startTime) / duration));
    var timeFunction = ( easings[easing] || easings.linear ) (time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}



function getOffset(el) {
	var rect, win

	if ( !el.getClientRects().length )
		return {
			top: 0,
			left: 0
		};
	// Get document-relative position by adding viewport scroll to viewport-relative gBCR
	rect = el.getBoundingClientRect();
	win = el.ownerDocument.defaultView;
	return {
		top: rect.top + win.pageYOffset,
		left: rect.left + win.pageXOffset,
		width: el.offsetWidth,
		height: el.offsetHeight
	}
}


function on (el, name, callback) {
    if (!el) return
    el.addEventListener(name, callback)
}
function off (el, name, callback) {
    if (!el) return
    el.removeEventListener(name, callback)
}
function attr (el, key, val) {
    if (!el) return
    if (val === undefined)
    	return el.getAttribute(key)
    el.setAttribute(key, val)
}
function query (el) {
    return document.querySelectorAll(el)
}
function isNumeric (n) {
	return typeof n === 'number' || (typeof n === 'string' && !Number.isNaN(n - 0))
}

var isNaN = Number.isNaN

function skrollTop(el) {
    this.el = typeof el == "object" ? el : query(el)[0]
}

skrollTop.prototype = {
    __ATTACK: {},
    attack: function attack() {
       if (!this.el) return
    	var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !!attr(this.el, "data-on") ? attr(this.el, "data-on") : "click"

		events = events.replace(/\s{2,}/g, " ").split(" ")

       var goto = arguments[1];
       var time = arguments[2];
       var type = arguments[3];
       var callback = arguments[4];
		events.forEach(function (event) {
		 if ( !/\S/.exec(event) )
		 	return false;
        if (this.__ATTACK[event])
           setTimeout(function () {
               off(this.el, event, this.fn)
           }.bind({ el: this.el, fn: this.__ATTACK[event] }))

        this.__ATTACK[event] = function(e){

    	 	this.el.tagName == "A" && e.preventDefault()

			goto === undefined && !!( (attr(this.el, "data-goto") || attr(this.el, "href")) ) && (goto = attr(this.el, "data-goto") || attr(this.el, "href") )
			time === undefined && !!attr(this.el, "data-duration") && ( time = attr(this.el, "data-duration") )
			type === undefined && !!attr(this.el, "data-type") && ( type = attr(this.el, "data-type") )



			if (typeof goto == "object")
				goto = getOffset(goto).top
			else if (isNaN(goto - 0))
				goto = getOffset(query(goto)[0]).top
			else goto -= 0
			
			if (goto === undefined)
				return console.warn("Goto undefiend")
			
			scrollIt(goto, time, type, callback)
		 }.bind(this)
		 on(this.el, event, this.__ATTACK[event])
		}.bind(this))
    },
    dittack: function dittack() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "click";
        off(this.el, event, this.__ATTACK[event]);
	}
}

skrollTop.uid = ( "skroll-" + Math.random() ).replace(/\./g, "")
skrollTop.getOffset = getOffset
skrollTop.on = on
skrollTop.off = off
skrollTop.attr = attr
skrollTop.query = query
skrollTop.isNaN = isNaN
skrollTop.isNumeric = isNumeric
skrollTop.scrollTo = function (el, duration, easing, callback) {
    if ( isNumeric(el) )
    	el -= 0
    else {
       el = ( typeof el == "string" ? query(el)[0] : el )
		if ( el instanceof Element )
			el = getOffset(el).top
		else return console.error("skroll<Error>: scrollTo can't find element.")
    }
    
    scrollIt(el, duration, easing, callback)
}
var cofDefault = { el: ".skrollTop" }
skrollTop.init = function init (config) {
    if (typeof config != "object")
    	config = {}
    	
    for (var key in cofDefault)
    	if (config[key] === undefined)
			config[key] = cofDefault[key]
    var arrs = query(config.el)

	var length = arrs.length - 1, el
	
	while (el = arrs[length--]) {
	    el[skrollTop.uid] = new skrollTop(el)
		el[skrollTop.uid].attack(
			config.event,
			config.goto,
			config.duration,
			config.type,
			config.onScroll
		)
	}
	
}

function loadDone () {
	off(window, "load", loadDone)
	off(DOM, "DOMContentLoaded", loadDone)
	skrollTop.init()
}
if (DOM.readyState === "complete")
	skrollTop.init()
else {
	on(window, "load", loadDone)
	on(DOM, "DOMContentLoaded", loadDone)
}

return skrollTop

})
