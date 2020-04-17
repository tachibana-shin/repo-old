/*!
 * SearchParams.js v0.1
 * (c) 2020 Shinigami
 * Released under the MIT License.
 */
!function ( global, factory ) {
"use strict"
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SearchParams = factory())
}(this, function () {
"use strict";

function _defineProperty(obj, key, value) {
	if (key in obj)
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		})
	else obj[key] = value;
	
	return obj
}
// search params

function SearchParams(params) {
	if (params[0] === "?") params = params.slice(1);
	if (params.indexOf("=") === -1) params = "";

	params = params.split("&").map(function (e) {
		var j = e.indexOf("=");
		return j == -1 ? [e] : [e.slice(0, j), e.slice(j + 1)];
	});
	this.params = params;
}

SearchParams.prototype = {
	append: function append(key, val) {
		this.params.push([key, val]);
	},
	delete: function _delete(key) {
		this.params = this.params.filter(function (val) {
			return val[0] !== key;
		});
	},
	entries: function entries() {
		return this.params;
	},
	forEach: function forEach(fn) {
		this.params.map(function (val) {
			return _defineProperty({}, val[0], val[1]);
		}).forEach(fn)
	},
	get: function get(key) {
		var leng = this.params.length,
		    i = 0,
		    result;
		while (i < leng) {
			if (this.params[i][0] === key) {
				result = this.params[i][1] || "";
				break;
			}
			i++;
		}
		return result;
	},
	getAll: function getAll(key) {
		return this.params.filter(function (val) {
			return val[0] === key;
		}).map(function (e) {
			return e[1] || "";
		});
	},
	has: function has(hkey) {
		return this.params.some(function (val) {
			return val[0] === hkey;
		});
	},
	keys: function keys() {
		var arr = this.params,
		    length = arr.length,
		    i = 0,
		    newArr = [];
		while (i < length) {
			if (arr.indexOf(arr[i][0]) === -1) newArr.push(arr[i][0]);
			i++;
		}
		return newArr;
	},
	set: function set(_key, _val) {
		var replaced = false;
		this.params = this.params.filter(function (val, key, arr) {
			if (replaced && val[0] === _key) {
				return false;
			}
			if (!replaced && val[0] === _key) val[1] = _val, replaced = true;
			return true;
		});
	},
	sort: function sort(fn) {
		if (typeof fn == "function") this.params = this.params.sort(fn);
		this.params = this.params.sort(function (a, b) {
			return (a + "").charCodeAt(0) - (b + "").charCodeAt(0);
		});
	},
	toString: function toString() {
		return this.params.map(function (val) {
			return val.join("=");
		}).join("&");
	},
	values: function values() {
		return this.params.map(function (val) {
			return val[1] || "";
		});
	}
};
return SearchParams
})
