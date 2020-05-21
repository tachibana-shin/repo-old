/*!
 * Local.js v1.5.1
 * (c) 2020 Nguyen Thanh
 * Released under the MIT License.
 */
!function ( global, factory ) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Local = factory());
}(this, function () {
"use strict"
var local = {}
var settings = {}
var onEvents = {}
var localStorage = isSupportLocal() ? window.localStorage : {}
var isarr = Array.isArray
var arrayProto = Array.prototype;
var methodsWatch = "push pop shift unshift splice sort reverse".split(" ");
function error() {
(window.console ? window.console.error || noop : noop).apply(console, arguments)
}
function isSupportLocal() {
   var key = Math.random();
   if ( !window.localStorage ) return false
   try {
      window.localStorage[key] = key
      window.localStorage.clear(key)
      return true
   }  catch(e) { return false }
}
function noop () {};
function def (obj, key, val, enumerable) {
	Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
	});
}
function isobj(e) {
    return e !== null && typeof e == "object" && !isarr(e)
}
function on(name, callback) {
    if ( !isarr(onEvents[name]) )
    	onEvents[name] = []
    onEvents[name].push(callback)
    return this
}
function off(name, callback) {
    if ( !callback ) {
       onEvents[name] = []
    }
    else
    	onEvents[name].forEach(function(e, index) {
    		if (callback === e)
    			delete onEvents[name][index]
		})
    return this
}
function once(name, callback) {
    function _callback() {
        callback.apply(this, arguments)
		 off(name, _callback)
    }
    on(name, _callback)
    return this
}
function trigger(key, newVal) {
    if (isarr(onEvents[key])) {
    	onEvents[key]
		.forEach(function(e) {
			if (typeof e == "function")
				e.call(null, newVal, getValue(key.replace(/^(?:(set|get)\:)/, "")))
		})
	}
}
function ofType(el, type) {
    return type === undefined || el === undefined || (isarr(type) ? type : [type])
	.some(function(e) {
		return (el !== null && el.constructor === e)
	})
}
function defaultValue(e) {

    var r, cof, tmp, type = settings[e].type
    if ( e in settings && "default" in settings[e] ) {
       tmp = settings[e].default == "function" ? settings[e].default() : settings[e].default
       if ( typeof tmp == "function" )
           error("Local.js: Type value default \"" + key + "\" left!")
       else r = tmp
    }

    r === undefined && (isarr(type) ? type : [type])
    .some(function (e) {
        if (e == String)
        	return r = "", true
        if (e == Object)
        	return r = {}, true
        if (e == Array)
        	return r = [], true
        if (e == Boolean)
        	return r = false, true
    })
    return r === undefined ? new e[0] : r
}
function getValue(key) {
    var val = localStorage[key], sett = settings[key]
	if ( sett === undefined )
		return error("Local.js: \"" + key + "\" not sign!")
	if ( key in localStorage ) {
		val = JSON.parse(val)
		val = val.isJSON ? val.value : val.isBoolean ? eval(val.value) : val.value

		if ( !ofType(val, sett.type) )
    	  	val = defaultValue(key)
	}
	return val
}

function watchArray(array, callback) {
var arrayMethods = Object.create(arrayProto);
methodsWatch.forEach(function (method) {

    var original = arrayProto[method];

	def(array, method, function () {
    	original.apply(this, arguments)
		callback.apply(this, arguments)
	})
})

}

var keySys = ["$on", "$off", "$watch", "$one", "$clear"]
function resign(key, setting) {
    
    if (Array.isArray(key))
    	return key.forEach(function(e) {
    	    resign(e, setting)
    	})
    
    if ( keySys.indexOf(key) > -1 )
    	return error("Local.js: \"" + key + "\" is key sign watch. Do not use key use! You can omit the first $ character.")
    
    settings[key] = setting || {}
    
    Object
	.defineProperty(local, key, {
    	set: function(newVal) {
    		
    		if ( typeof newVal == "function" )
    			return error("Local.js: localStorage don't data is function.")

			var sett = settings[key];
			var typeTrue = false;
			var isValDefl = false;
			
			if (newVal === undefined && sett.default !== undefined) {
    			newVal = typeof sett.default === "function" ? sett.default() : sett.default
				isValDefl = true
			}
		
			typeTrue = ofType(newVal, sett.type);

			if (!typeTrue) {
			    error( "Local.js: " + (isValDefl ? "Type value default left!" : "Type value left!") )
			}
			
    		if ( typeof sett.validator !== "function" || sett.validator(newVal, getValue(key)) && typeTrue ) {

				newVal = JSON
				.stringify({
					value: newVal,
					isJSON: isobj(newVal) || isarr(newVal),
					isBoolean: typeof newVal == "boolean"
				})

				localStorage[key] = newVal
				trigger("set:" + key, JSON.parse(newVal).value)
			}
			
			if ( !ofType(getValue(key), sett.type) )
				local[key] = defaultValue(key)
    	},
    	get: function() {
    	  	var val = getValue(key)
		  	trigger("get:" + key, val)
			if ( isarr(val) )
				watchArray(val, function() {
    				local[key] = this
				})
			return val
    	}
	})
}

function watch (list) {
    if (isarr(list))
    	resign(list)
    else for (var key in list)
		!function() {
			var setting, valDefl;
       		if ( isobj(list[key]) )
           	setting = list[key]
       
       		else setting = { type: list[key] };
			
			if ( setting.type !== undefined && setting.type == Function || (isarr(setting.type) && isarr(setting.type).indexOf(Function) > -1) )
				error("Local.js: localStorage don't data is function.")
			else {
				resign(key, setting)
				if ( getValue(key) === undefined )
					local[key] = defaultValue(key)
			}
		}()
    return this
}
function clear(e) {
    if (e === undefined) {
       for (var key in settings)
           local[key] = defaultValue(key)
       return this
    }
    if ( !isarr(e) )
    	e = [e]
    e.forEach(function(e) {
        if ( !(e in settings) )
            return error("Local.js: \"" + e + "\" not watch!")
        local[e] = defaultValue(e)
    })
    return this
}

local.$on = on
local.$off = off
local.$watch = watch
local.$one = once
local.$clear = clear
/*
	--validator
	--type
	--default
*/
return local
})

