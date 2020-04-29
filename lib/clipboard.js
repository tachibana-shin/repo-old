/*!
 * clipboard.js v1.0
 * (c) 2020 Shinigami
 * Released under the MIT License.
 */
!function ( global, factory ) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) :
	typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.Clipboard = factory(global));
}(this, function (window) {
"use strict"
function attr (el, key, val) {
    var attr
    if (!el) return
    if (val === undefined) {
    	attr = el.getAttribute(key)
    	return !!attr ? attr : undefined
    }
    el.setAttribute(key, val)
}
function hasAttr(el, key) {
    if (!el) return
    return el.hasAttribute(key)
}
function unAttr(el, key) {
    if (!el) return
    return el.removeAttribute(key)
}
function select(el) {
	var selectedText;

	if (el.nodeName === 'SELECT') {
		el.focus();

		selectedText = el.value;
	}
	else if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
		var isReadOnly = hasAttr(el, 'readonly');

		if (!isReadOnly)
			attr(el, 'readonly', '');

		el.select();
		el.setSelectionRange(0, el.value.length);

		if (!isReadOnly)
			unAttr(el, 'readonly');

		selectedText = el.value;
	}
	else {
		if ( hasAttr(el, 'contenteditable') )
			el.focus();

		var selection = window.getSelection();
		var range = document.createRange();

		range.selectNodeContents(el);
		selection.removeAllRanges();
		selection.addRange(range);

		selectedText = selection.toString();
	}

	return selectedText;
}

function query (q) {
    return _typeof(q) === "string" ? document.querySelector(q) : q
}
function _typeof(e) {
    return e == null ? "null" : typeof e
}
function Clipboard(el, config) {
	_typeof(config) !== "object" && (config = {})

	this.el = el
	
	if ( config.inheritAttr === true && _typeof(this.el) == "object" && "nodeType" in this.el ) {
    	config = {
    	    action: attr(this.el, "data-clipboard-action"),
			text: attr(this.el, "data-clipboard-text"),
			target: attr(this.el, "data-clipboard-target"),
			event: attr(this.el, "data-clipboard-event")
    	}
	}
	
	this.config = config
	this.action = config.action
	this.text = config.text
	this.active = this.active.bind(this)
	this.on = this.on.bind(this)
	this.off = this.off.bind(this)
	this.once = this.once.bind(this)
	this.emit = this.emit.bind(this)
	this.target = config.target

	_typeof(this.el) == "object" &&
	config.event !== false &&
	(_typeof(config.event) == "string" ? config.event.split(" ") : ["click"])
	.forEach(function(event) {
    	this.el
		.addEventListener(event, this.active)
	}.bind(this))
}
var definedProperty = Object.defineProperty;


Clipboard.prototype = {
active: function active () {
	var type = this.action

	var message, succeeded
	var selectedText;
	
	var el = this.text !== undefined ? this.createFake() : this.target

	try {
		if ( !document
		.queryCommandSupported(type) )
			message = "This browser not support action \"" + type + "\"",
			succeeded = false;

		else {
			//my(el).select()
			selectedText = select(el)
			succeeded = document.execCommand(type)
		}
	}
	catch(e) {
		message = e + ""
		succeeded = false
	}
	this.removeFake()
	this.emit(succeeded ? "success" : "error", {
		action: type,
		text: selectedText,
		message: message
	})
	.emit("finally", {
	    action: type,
		text: selectedText,
		message: message
	})
},
hasAttr: function hasAttr(e) {
	return hasAttr(this.el, e)
},
on: function on (name, callback, cof) {
	var e = this.__event || (this.__event = {});

    (e[name] || (e[name] = [])).push({
		fn: callback,
		cof: cof
    });
    return this;
},
once: function once (name, callback, cof) {
	var self = this;
	function halder () {
		self.off(name, halder);
		callback.apply(ctx, arguments);
	}
	return this.on(name, halder, cof);
},
emit: function (name) {
	var data = [].slice.call(arguments, 1);
	var evtArr = ((this.__event || (this.__event = {}))[name] || []).slice();
	var i = 0;
	var len = evtArr.length;
	for (i; i < len; i++)
      evtArr[i].fn.apply(
		evtArr[i].ctx,
		data
	  )

	return this;
},
off: function (name, callback) {
	var e = this.__event || (this.__event = {});
	var evts = e[name];
	var liveEvents = [];
	if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback)
          liveEvents.push(evts[i]);
      }
    }

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

	return this;
},
createFake: function creareFake() {
	var isRTL = attr(document.documentElement, 'dir') == 'rtl';
	
	this.fakeElement = document.createElement('textarea');
	
	attr(this.fakeElement, "style", "font-size: 12pt; border: 0; padding: 0; margin: 0; position: absolute;" + (isRTL ? 'right' : 'left') + ": -9999px;")
	this.fakeElement.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px"
	attr(this.fakeElement, 'readonly', '');
	this.fakeElement.value = typeof this.text == "function" ? this.text.call(this) : this.text
	document.documentElement.appendChild(this.fakeElement);
	return this.fakeElement
},
removeFake: function removeFake() {
    _typeof(this.fakeElement) == "object" && this.fakeElement.remove()
	this.fakeElement = undefined

}
}

!function (e) {
    for (var key in e)
    	definedProperty(
			Clipboard.prototype,
			key,
			e[key]
		);
}({
action: {
	set: function set() {
		var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
		this._action = action;
		
		if (this._action !== 'copy' && this._action !== 'cut')
			throw new Error('Invalid "action" value, use either "copy" or "cut"');
	},
	get: function get() {
		return this._action;
	}
},
target: {
	set: function set(target) {
		target = query(target)
		if (target !== undefined) {
			if (target && _typeof(target) === 'object' && target.nodeType === 1) {
				if (this.action === 'copy' && hasAttr(target, 'disabled'))
					throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');

				if (this.action === 'cut' && (hasAttr(target, 'readonly') || hasAttr(target, 'disabled')))
					throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');

				this._target = target;
			} else {
				throw new Error('Invalid "target" value, use a valid Element');
			}
		}
	},
	get: function get() {
		return this._target;
	}
},
el: {
	set: function set(el) {
		el = query(el)
		if (_typeof(el) == "object" &&  _typeof(el.nodeType) == "number")
			this._el = el;
	},
	get: function get() {
		return this._el;
	}
}
})
	return Clipboard
})
