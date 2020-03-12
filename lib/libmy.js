!function (global, factory) {
	if (typeof global.my !== "function")
		return 0
	factory(global.my)
}(this, function (my) {
for (var $k in my.fn) {
!function () {
    var $v = my.fn[$k]
    if (typeof $v !== "function")
    	return 0;
    my.fn["m" + $k] = function() {
        var args = arguments, r, isResult = false
        this.each(function () {
            r = $v.apply(my(this), args)
            if (!(r instanceof my))
                return !(isResult = true)
        })
        
        return isResult === false ? this : r
    }
}()
}
})
