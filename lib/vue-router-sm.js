!function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.RouteVue = factory(global));
}(this, function (window) {
"use strict"
var RouteVue = {
	install: function(Vue, config) {

(typeof config != "object" || config === null) && (config = { acceptDomain: true })

var lastData = new Object(null)
var storeData = new Array
var indexPageNow = 0;
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

function pushState (url, replace, data, $vnode) {

    var history = window.history;
    
    try {
      if (replace) {
        
        if ( indexPageNow < storeData.length ) storeData[ indexPageNow ] = {
          path: path,
          offset: getScrollPosition(),
          data: data,
          $vnode: $vnode
        }

        history.replaceState({
          Index: indexPageNow
        }, "", url);
      } else {
    		storeData.push({
    	    	path: url,
    	    	offset: getScrollPosition(),
				data: data,
				$vnode: $vnode
    		})
    	 
        history.pushState({
          Index: indexPageNow = storeData.length
        }, "", url);
      }
    } catch (e) {
      window.location[replace ? 'replace' : 'assign'](url);
    }
}
function saveLastData (url, data, $vnode) {
    lastData = {
       path: url,
       offset: getScrollPosition(),
       data: data,
       $vnode: $vnode
    }
}

function getScrollPosition () {
    return {
        x: window.pageXOffset,
        y: window.pageYOffset
    }
}

function restoreScrollPosition(e) {
	window.scrollTo(e.x, e.y)
}

function trim (str) {
   return str == null ? '' : (str + '')
.replace(rtrim, '')
}

function guardEvent (e) {
    // don't redirect with control keys
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
    // don't redirect when preventDefault called
    if (e.defaultPrevented) { return }
    // don't redirect on right click
    if (e.button !== undefined && e.button !== 0) { return }
    // don't redirect if `target="_blank"`
    if (e.currentTarget && e.currentTarget.getAttribute) {
      var target = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(target)) { return }
    }
    // this may be a Weex event which doesn't have this method
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    return true
}


var saveFirstPage = false
        Vue.component("router-view", {
            created() {
              if (saveFirstPage === false) {
  try {
     window.history.replaceState({
          Index: indexPageNow = 0
     }, "", this.$root.currentRoute)
  } catch (e) {
      window.location.replace(url);
  }
    
                saveFirstPage = true
              }
            },
            render(h) {
                return h(this.ViewComponent)
            },
            computed: {
                ViewComponent () {
      				     if ( config.acceptDomain === false && (trim(this.$root.currentRoute) == "" || trim(this.$root.currentRoute) == "./") )
      				        return { template: "<span></span>" }
      				 return this.$root.$options.routes[this.$root.currentRoute] || (this.$root.$options.routes["404.html"] || { template: "<h1>404 Not Found</h1>" })
    			 }
            }
        })
        Vue.component("router-link", {
            props: {
                "to": {
                    required: true,
                    type: String
                },
                "tag": {
                    type: String,
                    default: "a"
                },
                "data": {
                    required: false
                },
                "event": {
                    type: [String, Array],
                    default: "click"
                },
                "replace": {
                    type: Boolean,
                    default: false
                },
                "title": {
                    type: String,
                    required: false
                }
            },
            inheritAttrs: true,
            render(h) {
                var self = this
                var attrs = {}
                var isTagA = this.tag == "a" || this.tag == "A"
                
if ( isTagA )
	attrs.href = this.to
                
                
function pathTo () {
    if ( storeData.length > indexPageNow )
	  storeData.splice(indexPageNow, storeData.length - indexPageNow);
	  // if router-view dbclick or more not active push and save
  	if ( (indexPageNow < storeData.length ? storeData[indexPageNow] : lastData).$vnode === self )
  	   return
			    
  	// self.to la path dang push den
	  // phai luu path hien tai trong $root.currentRoute
	  
	  pushState(self.$root.currentRoute, self.replace, self.data, self)
	  saveLastData(self.to, self.data, self)
  	//pushState(self.to, true, self.data, self)
  	window.scrollTo(0, 0)
  	self.$root.currentRoute = self.to
	
	//return false
}


var handler = function (e) {
  if (guardEvent(e)) {
     if (self.replace) {
        pathTo(true)
     } else {
        pathTo(false)
     }
  }
};

var on = { click: handler };

if (Array.isArray(this.event)) {
    this.event.forEach(function(e){
        on[e] = handler;
    });
} else {
    on[this.event] = handler;
}

return h(this.tag, {
    attrs: attrs,
		on: on,
		props: {
		  class: {
		    "text-secondary": this.active
		  }
		}
}, this.$slots.default)
                
            }
        })
     
     
     var isPush = window.history && 'pushState' in window.history
		 var event = isPush ? 'popstate' : 'hashchange'
		
		 window.addEventListener(event, e => {
    		// if e.state then Index in e.state
    		
    		if (e.state) {
    	  	var getStoreData = e.state.Index < storeData.length ? storeData[e.state.Index] : lastData
			    
			    indexPageNow = e.state.Index

			    //before pop
			    getStoreData.$vnode.$emit("before-pop", getStoreData.data)
			    restoreScrollPosition(getStoreData.offset)
			  
			    getStoreData.$vnode.$emit("pop", getStoreData.data)
			    getStoreData.$vnode.$root.currentRoute = getStoreData.path

			    //after pop
			    getStoreData.$vnode.$emit("after-pop", getStoreData.data)
			  }
		 })
    }
}
return RouteVue
})
