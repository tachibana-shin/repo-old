!function () {
  var STORE_KEY = Math.random().toString(36);
  new Vue({
    el: "#app",
    data: {
      state: {
        Home: true,
        App: false,
        Info: false
      },
      store: {
        Home: [0, 0],
        App: [0, 0],
        Info: [0, 0]
      },
      stores: ["Home", "App", "Info"],
      typeAnime: "page-3d"
    },
    components: {
      Home: $import("html/home.html"),
      App: $import("html/app.html"),
      Info: $import("html/info.html"),
      toolbar: $import("html/toolbar.html")
    },
    computed: {
      iOS: function iOS() {
        var os = navigator.userAgent.match(/OS ([\d\._]*)/);
        return os ? os[1].replace(/_/g, ".") : "unknown";
      },
      iDevice: function (_iDevice) {
        function iDevice() {
          return _iDevice.apply(this, arguments);
        }

        iDevice.toString = function () {
          return _iDevice.toString();
        };

        return iDevice;
      }(function () {
        return iDevice;
      })
    },
    mounted: function mounted() {
      my(this.$el).unAttr("hidden")
      var _this = this;

      this.stores.map(function (name) {
        _this.$watch("state." + name, function (e) {
          if (e) {
            _this.stores.forEach(function (e) {
              if (e !== name) Vue.set(_this.state, e, false);
            });

            setTimeout(function () {
              return window.scrollTo.apply(null, _this.store[name]);
            }, 300);
          } else {
            _this.store[name] = [pageXOffset, pageYOffset];
          }
        });
      });
    }
  });
}();