/*!
 * mystate.js v1.0
 * (c) 2020 Shinigami
 * Released under the MIT License.
 */
!function ( global, factory ) {
    if (typeof define === 'function' && define.amd)
		define(['myjs'], factory);
	else if (typeof module === 'object' && module.exports)
		module.exports = factory(require('myjs'));
	else {
		if (typeof my === 'function') factory(my)
		else throw 'myState.js: myJS NOT install!';
	}
}(this, function (my) {
"use strict"
var open, self
if (typeof window.history.pushState)
	open = window.history.pushState
else open = window.open

if (typeof window.history.replaceState)
	self = window.history.replaceState
else open = function (link) {
    window.open(link, "_self")
}

function link (e) {
   e.preventDefault()
   if (this.target === "_blank")
      open(this.href)
   else self(this.href)
}
        
        
my.fn.extend({
    state: function () {
        this.each(function () {
            my(this).click(link, { passive: false })
        })
        return this
    },
    unState: function () {
        this.each(function () {
            this.off("click", link)
        })
        return this
    }
})
})