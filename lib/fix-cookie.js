!function () {
    function isCookieActive() {
        var key = rand() + ""
        device.cookie.set(key, key, "+1day")
		 document.cookie = ""
		 if (device.cookie.get(key) === key)
			return device.cookie.remove(key), true
		return false
    }
    var localS = localStorage
    function local () {
        if (localS.cookie == null || typeof localS.cookie != "object")
			localS.cookie = {}
		
    }
    if (!isCookieActive())
    	Object
		.defineProperty(document, "cookie", {
    		set: function (e) {
    		    local()
    		    e = e.split(";")[0].split("=")
				localS.cookie[e[0]] = e.slice(1).join("=")
    		},
    		get: function () {
    		    local()
    		    var ck = []
    		    my.each(localS.cookie, function (key, val) { ck.push([key, val].join("=")) })
				return ck.join(";")
    		}
		})
}()