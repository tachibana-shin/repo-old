/*!
 * load-vue.js v1.1.5
 * (c) 2020 Nguyen Thanh
 * Released under the MIT License.
 */
!function ( global, factory ) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global["$import"] = factory());
}(this, function () {
"use strict";
var self = window

var dirname = function () {
	var rx1 = /(.*)\/+([^/]*)$/,
	rx2 = /()(.*)$/
	return function (path) {
		return (rx1.exec(path) || rx2.exec(path))[1]
	}
}()
var basename = function () {
	var rx1 = /(.*)\/+([^/]*)$/,
	rx2 = /()(.*)$/
	return function (path) {
		return (rx1.exec(path) || rx2.exec(path))[2]
	}
}()

function extend() {
	var args = arguments, target = args[0], length = args.length, noChild = false, i = 1, opt, src, copy, Arr = false, clone;
	if(typeof target === 'boolean')
			noChild = target,
			target = args[i],
			i++;
	if(length === i) target = this, i--;
	if(typeof target !== 'object' && !isFunc(target)) target = {};
	for(; i < length; i++)
	  if((opt = args[i]) != null)
		for(var key in opt) {
			src = target[key]
			copy = opt[key]
			if(src === copy) continue;
			if(noChild && copy && ((Arr = isArr(copy)) || isObj(copy))) {
   //giữ tính chất
   Arr ? (
   		clone = src && isArr(src) ? src : [], Arr = !1
   ) : (
   		clone = src && isObj(src) ? src : {}
   )
   target[key] = my.extend(!0, clone, copy)
} else if(copy !== undefined) target[key] = copy;
		};;
	return target
}

var trim = function () {
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	return function (str) {

		return str == null ? "" : (str + "").replace(rtrim, "")
	}
}()

function replace(el, el1) {
	if (Element.prototype
	.replaceChild)
		el.parentNode
		.replaceChild(el1, el)
	else {
		el.parentNode.insertBefore (el, el1)
		el.remove()
	}
}

var domify = function () {
	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
	rhtml = /<|&#?\w+;/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
	function htmlPrefilter(html) {
		return html.replace(rxhtmlTag, '<$1></$2>')
	}

	var wrapMap = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: [ 0, "", "" ]
	}
	wrapMap.optgroup = wrapMap.option
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead
	wrapMap.th = wrapMap.td

	
	function cloneScript(el) {
		var newEl = document.createElement("script"), attrs = el.attributes, length = attrs.length
	
		while ( length-- )
			newEl.setAttribute(
				attrs[length].name,
				attrs[length].value
			)
		newEl.innerHTML = el.innerHTML
		return newEl
	}

	return function (html) {
		var frag = document.createDocumentFragment(),
tmp, tag, wrap, scripts, all;

		tmp = document.createElement('div')
		tag = (rtagName.exec(html) || ['', ''])[1].toLowerCase()
		wrap = wrapMap[tag] || wrapMap._default

		tmp.innerHTML = wrap[1] + htmlPrefilter(html) + wrap[2]

		var j = wrap[0];
		while (j--) tmp = tmp.lastChild;

		scripts = tmp.getElementsByTagName('script')
		var i = 0, elem
		while ( elem = scripts[i++] )
			replace(elem, cloneScript(elem))

		all = tmp.childNodes;
		while (elem = all[0])
			frag.appendChild(elem);

		return frag
	}
}()

function attr(el, key, val) {
	if (val === undefined)
		return el.getAttribute(key)
	if (typeof val == "function")
		val = val( attr(el, key) )
	el.setAttribute(key, val)
}

var each = function () {
	function isFunc (e) {
		return typeof e === 'function' && typeof e.nodeType !== 'number'
	}
	function isObj (obj) {
		return obj !== null && typeof obj == 'object'
	}
	function isLikeArr (arr) {
		if (isFunc(arr) || arr === self) 
			return false;
		return isObj(arr) && 'length' in arr
	}

	return function(arr, callback) {
		var len, i = 0;
		if ( isLikeArr(arr) ) {
			len = arr.length
			for (; i < len; i++)
				if (callback.call(arr[i], arr[i], i) === false) break;;
		} else {
			for (i in arr) 
				if (callback.call(arr[i], arr[i], i) === false) break;;
		}
		return arr
	}
}()

function handleJS(array, hell, done) {
	var scripts = []
	each(array, function (e) {
    	scripts.push([function (callback) {
    		if (attr(e, "src") === null)
				return callback(e.innerHTML)
    		var script = document.querySelector("script[data-src=\"" + attr(e, "src") + "\"]")

    		if ( script )
    		   callback(script.innerHTML)
    		var xhr = new XMLHttpRequest

			xhr.open("get", attr(e, "src"))
			xhr.addEventListener("readystatechange", function () {
    			if (this.readyState == 4)
					callback(this.responseText)
			})
			xhr.send()
		}, e])
	})
	/* Loading js */

	var length = scripts.length

	function runCallback(index) {
	    // queque đệ quy
	    if ( index >= length )
	    	return done()
	    var tmp = scripts[index]
	    
	    var is = attr(tmp[1], "async") !== null
	    
	    tmp[0](function (response) {
    		hell.call(self, response, tmp[1])
    		is || runCallback(++index)
		})
		
		is && runCallback(++index)
	}
	
	runCallback(0)
	
}

return function (pathParent, defaultOption, before, after) {
	return function (resolve, reject) {
		if ( typeof before == "function" )
			before()
		var xhr = new XMLHttpRequest
		xhr.open("get", pathParent)
		xhr.addEventListener("readystatechange", function () {
			if (xhr.readyState == 4) {
				if ( !trim(xhr.responseText) )
					return reject("load-vue: \"" + pathParent + "\" empty!")
				var x5i609lhm = domify(xhr.responseText), exports = {}, $pwd = dirname(pathParent) || ""

				each(
					x5i609lhm
.querySelectorAll("tempate")
				,function(e) { document.body.appendChild(e) })

				each(
					x5i609lhm
.querySelectorAll("style, link")
				,function(e) {
					document.head
					.appendChild(e)
					
					e.tagName == "LINK" && !!attr(e, "href") && attr(e, "href", function (path) {
  return path.match(/(^\/)|(:\/\/)/) ? path : ($pwd + "/" + path)
})
				})
				
				each(
					x5i609lhm
.querySelectorAll("script")
					,function (e) {
					    !!attr(e, "src") && attr(e, "src", function (path) {
  return path.match(/(^\/)|(:\/\/)/) ? path : ($pwd + "/" + path)
})
				})

				handleJS(x5i609lhm
.querySelectorAll("script"),
				function (response, el) {
					if ( attr(el, "appear") !== null ) {
						el.removeAttribute("appear")
						el.removeAttribute("src")
						attr(el, "data-src", attr(el, "src"))
						el.innerHTML = response
						if ( !document.querySelector("script[data-src=\"" + attr(el, "src" + "\"]")) )
						document.head.appendChild(el)
					}

					else eval(response)
				}, function () {
					exports.template = (x5i609lhm.querySelector("*") || { outerHTML: "" }).outerHTML

					if ( exports.data !== null && typeof exports.data == "object" ) {
					  "pwd" in exports.data || (exports.data.pwd = $pwd)
						!function () {
							var _$data = exports.data
							exports.data = function () { return _$data }
						}(void 0)
					}
					resolve(extend(defaultOption || {}, exports))
					if ( typeof after == "function" )
						after()
				})
			}
	 	})
	 	
	 	xhr.send()
	}
	 
}
})
