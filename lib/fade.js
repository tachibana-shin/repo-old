! function(my) {
    if (typeof my !== 'function') throw 'fadeJS: Please install myJS';

var TRANSITION = my.prefix("transition")
    my.fn.fadeIn = function(t, n) {

        if (isFunc(t)) n = t, t = 200;
        if (!my.isNumeric(t)) t = 200;
        var i = this.css(TRANSITION);
        t = "opacity " + t + "ms linear";
        return this
        .css("opacity",  
this.dataUser("opacity") || 1)
		 .css(TRANSITION, i + "," + t)
        .one(my.fx.transitionEnd, function(t) {
            isFunc(n) && n.call(this, t.target);
            var i = my(t.target).css(TRANSITION).replace(/opacity(?:.{0,}\,|\0)/, "");
            my(t.target).css({
                transition: i
            })
        }), this
    }
    
    my.fn.fadeOut = function(t, n) {
        if (isFunc(t)) n = t, t = 200;
        if (!my.isNumeric(t)) t = 200;
        var i = this.css(TRANSITION);
        t = "opacity " + t + "ms linear";
        return this
        .css("opacity",  
this.dataUser("opacity") || 0)
		 .css(TRANSITION, i + "," + t)
		 .one(my.fx.transitionEnd, function(t) {
            isFunc(n) && n.call(this, t.target);
            var i = my(t.target).css(TRANSITION).replace(/opacity(?:.{0,}\,|\0)/, "");
            my(t.target).css({
                transition: i
            })
        }), this
    }, my.fn.fadeToggle = function(t, i) {
        return Number(this.css("opacity")) ? this.fadeOut(t, i) : this.fadeIn(t, i), this
    }
}(this.my)
