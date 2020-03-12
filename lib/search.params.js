!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.searchParams = factory());
}(this, function () {
"use strict"
	return function (params) {
    	if (params === undefined)
    		params = window.location.search
    	if (params[0] === "?")
    		params = params.slice(1)
    	if (params.indexOf("=") === -1)
    		return {}
    	params = params.split("&")
    	var i = 0, leng = params.length, result = {}, j

		for (; i < leng; i++) {
	    	j = params[i].indexOf("=")
	    	result[params[i].slice(0, j)] = params[i++].slice(j + 1)
		}
		return result
	}
})
