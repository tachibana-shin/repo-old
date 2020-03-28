/*!
 * Plugin clip.js v0.1
 * (c) 2019 Shinigami
 * Released under the MIT License.
 */
!function (global, factory) {
var my = typeof global.my === 'function' ? global.my : typeof module !== 'undefined' ? require('myjs') : console.log('Please install myJS on nodeJS or CDN')
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(my) :
  typeof define === 'function' && define.amd ? define(factory) :
  factory(my)
}(this, function (my) {
'use strict';
var DOM = document
my.fn.clipboard = function (el, action) {
	var that = this;
	return this.click(function () {
if(DOM.queryCommandSupported(action)) try {
	my(el).select()
DOM.execCommand(action) ? 
that.trigger("my.clip.success", {
		error: !1,
		action: action
}) : 
that.trigger("my.clip.failed", {
		error: "failed",
		action: action
});

		} catch (r) {
			that.trigger("my.clip.failed", {
				error: r + '',
				action: action
			})
		}
		else that.trigger("my.clip.failed", {
			error: "no support " + action,
			action: action
		});
	}), this
}
})
